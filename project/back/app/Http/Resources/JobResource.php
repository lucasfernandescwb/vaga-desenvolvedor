<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'companyName' => $this->company_name,
            'companyEmail' => $this->company_email,
            'salaryRange' => $this->salary_range,
            'country' => $this->country,
            'phoneNumber' => $this->phone_number,
            'type' => $this->type,
            'status' => $this->status,
            'description' => $this->description,
            'createdAt' => $this->created_at->format('M-Y'),
        ];
    }
}
