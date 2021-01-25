<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ItemStoreRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\Items\ItemCollection;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return ItemCollection::make(Item::applyFilters()->applySorts()->apiPaginate());
    }

    /**
     * @param \App\Http\Requests\ItemStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(ItemStoreRequest $request)
    {
        $item = Item::create($request->validated());
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Item $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item $item)
    {
        $item->update([]);
    }
}
