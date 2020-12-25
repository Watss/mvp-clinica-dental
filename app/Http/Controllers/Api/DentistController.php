<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\DentistCollection;
use App\Http\Resources\DentistResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\DentistRequest;

use App\Models\Dentist;
use App\User;

class DentistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return DentistCollection::make(Dentist::applyFilters()->applySorts()->apiPaginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DentistRequest $request)
    {
            $userRequest = $request->except('email','account_number');
            $dentistRequest = $request->only('email','account_number');

            $user = User::create($userRequest);

            $dentistRequest['user_id'] = $user->id;
            $dentist = Dentist::create($dentistRequest);

            return response()->json([
                "success" => true,
                "dentist" => DentistResource::make($dentist) //TODO: resource response
            ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Dentist $dentist)
    {
        return DentistResource::make($dentist);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(DentistRequest $request, Dentist $dentist)
    {
        $dentist->user->update($request->except('email','account_number'));
        $dentist->update($request->only('email','account_number'));

        return response()->json([
           "success" => true,
           "dentist" => DentistResource::make($dentist) //TODO: resource response
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Dentist $dentist)
    {
        $name = $dentist->user->user;
        $dentist->delete();
        return response()->json([
            "success" => true,
            "message" => "el dentista con el usuario $name ha sido correctamente Deshabilitado"
        ], 200);
    }

    public function restore($id)
    {
        $dentist = Dentist::withTrashed()->find($id);
        $dentist->restore();
        $name = $dentist->user->user;

        return response()->json([
            "success" => true,
            "message" => "el dentista con el usuario $name ha sido Habilitado"
        ], 200);
    }
}
