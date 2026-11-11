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
        Schema::create('projects', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('venture_id')->nullable()->index()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('category_label')->index();
            $table->string('location');
            $table->string('completion_year', 16)->nullable();
            $table->text('summary')->nullable();
            $table->string('image_path');
            $table->boolean('is_featured_hero')->default(false)->index();
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
        Schema::dropIfExists('projects');
    }
};
