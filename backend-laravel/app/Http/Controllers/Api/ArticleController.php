<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        return response()->json(
            Article::orderBy('created_at', 'desc')->get()
        );
    }

    public function show($id)
    {
        return response()->json(
            Article::findOrFail($id)
        );
    }

    public function store(Request $request)
    {
        $article = Article::create([
            'title'       => $request->title,
            'slug'        => \Str::slug($request->title),
            'content'     => $request->content,
            'source_url'  => $request->source_url,
            'is_updated'  => $request->is_updated ?? false,
        ]);

        return response()->json($article, 201);
    }

    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);
        
        $article->update([
            'title'       => $request->title ?? $article->title,
            'content'     => $request->content ?? $article->content,
            'is_updated'  => $request->is_updated ?? $article->is_updated,
        ]);

        return response()->json($article);
    }

    public function getOldestUnupdatedArticle()
    {
        $article = Article::where('is_updated', false)
            ->orderBy('created_at', 'asc')
            ->first();

        return response()->json($article);
    }
}
