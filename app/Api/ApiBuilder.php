<?php

namespace App\Api;

use Illuminate\Support\Str;

class ApiBuilder
{
    public function apiPaginate()
    {
        return function() {
            return $this->paginate(
                $perPage = request('page.size') ?: 5,
                $columns = ['*'],
                $pageName = 'page[number]',
                $page = request('page.number')
            )->appends(request()->except('page.number'));
        };
    }

    public function applySorts()
    {
        return function() {
            if(!property_exists($this->model, 'allowedSorts')){
                abort(500, 'Please set the public property $allowedSorts inside '.get_class($this->model));
            }

            if(is_null($sort = request('sort'))){ return $this; }

            $sortFields = Str::of($sort)->explode(',');

            foreach ($sortFields as $sortField) {
                $direction = 'asc';

                if(Str::of($sortField)->startsWith('-')){
                    $direction = 'desc';
                    $sortField = Str::of($sortField)->substr(1);
                }

                if(!collect($this->model->allowedSorts)->contains($sortField)){
                    abort(400, "Invalid this parameter, {$sortField} is not allowed!");
                }

                $this->orderBy($sortField, $direction);
            }

            return $this;
        };
    }

    public function applyFilters()
    {
        return function(){
            foreach(request('filter', []) as $filter => $value) {
                abort_unless($this->hasNamedScope($filter), 400, "The filter '{$filter}' is not allowed.");
                $this->{$filter}($value);
            }
            return $this;
        };
    }
}
