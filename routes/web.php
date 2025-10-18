<?php

use Illuminate\Support\Facades\Route;

// Serve via Blade views (the Blade files currently include the HTML from public/* for a smooth migration)
Route::get('/', fn () => view('index'))->name('home');
Route::get('/login', fn () => view('login'))->name('login');
Route::get('/register', fn () => view('register'))->name('register');
Route::get('/dashboard', fn () => view('dashboard'))->name('dashboard');
