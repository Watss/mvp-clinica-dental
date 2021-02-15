<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\PaymentRequest;
use App\Http\Resources\Payments\PaymentResource;
use App\Models\Payment;
use App\Http\Controllers\Controller;
use App\Http\Resources\Payments\PaymentCollection;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return PaymentCollection::make(Payment::applyFilters()->applySorts()->apiPaginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PaymentRequest $request)
    {
            $request['user_id'] = 36;
            $payment = Payment::create($request->all());

            return response()->json([
                "success" => true,
                "payment" => PaymentResource::make($payment)
            ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Payment $payment)
    {
        return PaymentResource::make($payment);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PaymentRequest $request, Payment $payment)
    {
        $payment->update($request->all());

        return response()->json([
           "success" => true,
           "payment" => PaymentResource::make($payment) //TODO: resource response
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();
        return response()->json([
            "success" => true,
            "message" => "Pago Eliminado"
        ], 200);
    }
}
