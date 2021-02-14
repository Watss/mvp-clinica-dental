<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Resources\Categories\CategoryCollection;
use App\Http\Resources\Categories\CategoryResource;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categories = Category::all();
        return CategoryCollection::make($categories);
    }

    /**
     * @param \App\Http\Requests\CategoryStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryStoreRequest $request)
    {
        $category = Category::create($request->validated());
        return response()->json([
            "success" => true,
            "category" => CategoryResource::make($category)
         ], 200);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Category $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $category->update([]);
    }

    public function destroy(Category $category)
    {
        if(count($category->items) > 0){
            return response()->json([
                'message' => 'No es posible eliminar esta categoria, ya que tiene items asociados',
            ], 422);
        }

        $category->delete();

        return response()->json([
            'message' => "Categoria $category->name Eliminada correctamente",
        ], 200);
    }
}
