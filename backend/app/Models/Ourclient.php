<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ourclient extends Model
{
    use HasFactory;

    public $timestamps = true;

    protected $table = 'ourclient';

    protected $fillable = [
        'id',
        'congregation',
        'province',
        'client',
        'logo',
        'created_at',
        'updated_at'
    ];
}
