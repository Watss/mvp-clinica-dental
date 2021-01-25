<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appoinments;
use Illuminate\Http\Request;
use App\Http\Resources\Appoinments\AppoinmentsCollection;
use App\Http\Resources\Appoinments\AppoinmentsResource;
use App\Http\Requests\AppoinmentsRequest;

class AppoinmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AppoinmentsCollection::make(Appoinments::apiPaginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AppoinmentsRequest $request)
    {
        //dd($request->all());

        $request = $request->all();
        $request += ['user_id' => 1];

        $appoinments= Appoinments::create($request);



        return response()->json([
            "success" => true,
            "appoinment" => AppoinmentsResource::make($appoinments)
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show( Appoinments $appoinment)
    {
        //dd($appoinment);
        return AppoinmentsResource::make($appoinment);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AppoinmentsRequest $request,Appoinments $appoinment)
    {
        $appoinment->update($request->only('date','time'));

        return response()->json([
            "success" => true,
            "appoinments" => AppoinmentsResource::make($appoinment)
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Appoinments $appoinment)
    {
        $appoinment->delete();

        return response()->json([
            "success" => true,
            "message" => "La cita ha sido eliminada correctamente"
        ], 200);
    }

    public function restore($id)
    {
        $appoinment = Appoinments::onlyTrashed()->find($id);

        if(!$appoinment){
            abort(404);
        }

        $appoinment->restore();

        return response()->json([
            "success" => true,
            "message" => "La cita n° $appoinment->id ha sido Habilitada"
        ], 200);
    }


}
