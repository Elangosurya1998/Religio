<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Onsitemeet extends Model
{
    use HasFactory;
    protected $table = 'onsitemeeting';
    protected $fillable = [
        'id',
        'onsitedate',
        'onsitedays',
        'expensive',
        'onsiteplace',
        'onsiterating',
        'onsite'
    ];
}
