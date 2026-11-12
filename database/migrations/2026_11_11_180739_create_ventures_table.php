<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ventures', function (Blueprint $table): void {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('short_label');
            $table->string('subtitle')->nullable();
            $table->string('badge')->nullable();
            $table->string('icon_name')->default('Building2');
            $table->text('summary');
            $table->longText('description')->nullable();
            $table->string('location_details')->nullable();
            $table->string('external_url')->nullable();
            $table->string('external_cta_label')->nullable();
            $table->json('highlights')->nullable();
            $table->json('image')->nullable();
            $table->json('hero_images')->nullable();
            $table->boolean('is_featured')->default(true)->index();
            $table->boolean('is_active')->default(true)->index();
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ventures');
    }
};
