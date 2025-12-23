<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;
use Illuminate\Support\Str;

class ScrapeBeyondChats extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape 5 oldest articles from BeyondChats';

    public function handle()
{
    $url = config('services.blog_scraper.url');
    if (!$url) {
        $this->error('BLOG_SCRAPE_URL is not set in .env');
        return;
    }

    $response = Http::get($url);

    if (!$response->successful()) {
        $this->error('Failed to fetch blog page');
        return;
    }

    $crawler = new Crawler($response->body());

    $articles = $crawler->filter('.card-content')->slice(-5);

    foreach ($articles as $articleNode) {
        $node = new Crawler($articleNode);

        $titleNode = $node->filter('h2.entry-title a');

        if ($titleNode->count() === 0) {
            continue;
        }

        $title = trim($titleNode->text());
        $link  = $titleNode->attr('href');

        $this->scrapeArticle($title, $link);
    }

    $this->info('Scraping completed!');
}


   private function scrapeArticle($title, $url)
{
    if (Article::where('source_url', $url)->exists()) {
        $this->warn("Already exists: $title");
        return;
    }

    $response = Http::get($url);

    if (!$response->successful()) {
        $this->warn("Failed to load article: $url");
        return;
    }

    $crawler = new Crawler($response->body());

    $content = '';

    if ($crawler->filter('.entry-content')->count()) {
        $content = $crawler->filter('.entry-content')->text();
    } elseif ($crawler->filter('.wp-block-post-content')->count()) {
        $content = $crawler->filter('.wp-block-post-content')->text();
    } elseif ($crawler->filter('main')->count()) {
        $content = $crawler->filter('main')->text();
    }

    if (empty(trim($content))) {
        $this->warn("Empty content: $url");
        return;
    }

    Article::create([
        'title'      => $title,
        'slug'       => \Str::slug($title),
        'content'    => trim($content),
        'source_url' => $url,
        'is_updated' => false,
    ]);

    $this->info("Saved: $title");
}

}
