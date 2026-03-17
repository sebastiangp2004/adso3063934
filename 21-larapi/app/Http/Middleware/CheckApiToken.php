<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Laravel\Sanctum\PersonalAccessToken;

class CheckApiToken
{
    /**
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        // If there is no token or the token wasn't found in the database,
        // consider it invalid and short‑circuit the request with a message.
        if (empty($token) || ! PersonalAccessToken::findToken($token)) {
            return response()->json([
                'message' => 'Token inválido'
            ], 401);
        }

        return $next($request);
    }
}
