<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Resources\Patients\PatientsCollection;
use App\Http\Resources\Patients\PatientsResource;
use App\Models\Patient;
use App\Http\Requests\PatientsRequest;


class PatientsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return PatientsCollection::make(Patient::applyFilters()->applySorts()->apiPaginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PatientsRequest $request)
    {
        //dd($request->all());

        $patient = Patient::create($request->all());

        return response()->json([
            "success" => true,
            "patient" => PatientsResource::make($patient)
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Patient $patient)
    {

        return PatientsResource::make($patient);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PatientsRequest $request, Patient $patient)
    {
        $patient->update($request->except('rut'));

        return response()->json([
            "success" => true,
            "patient" => PatientsResource::make($patient)
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Patient $patient)
    {


        $patient->delete();
        return response()->json([
            "success" => true,
            "message" => "el Paciente $patient->names ha sido correctamente Deshabilitado"
        ], 200);
    }

    public function restore($id)
    {
        $patient = Patient::onlyTrashed()->find($id);

        if(!$patient){
            abort(404);
        }
        $patient->restore();
        return response()->json([
            "success" => true,
            "message" => "el paciente $patient->names ha sido Habilitado"
        ], 200);
    }
}
