<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'type',
        'status',
        'description',
        'company_name',
        'company_email',
        'salary_range',
        'country',
        'phone_number'
    ];

    public function users() {
        return $this->belongsToMany(User::class);
    }
}
