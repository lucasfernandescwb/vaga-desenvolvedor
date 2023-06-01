<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->jobTitle(),
            'type' => fake()->randomElement(['CLT', 'PJ', 'FREELANCE']),
            'status' => fake()->randomElement(['OPEN', 'PAUSED']),
            'description' => fake()->paragraphs(3, true),
            'company_name' => fake()->company(),
            'company_email' => fake()->companyEmail(),
            'country' => fake()->country(),
            'phone_number' => fake()->phoneNumber(),
            'salary_range' => fake()->numberBetween(1200, 5800)
        ];
    }
}
