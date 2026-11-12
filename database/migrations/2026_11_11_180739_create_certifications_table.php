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
        Schema::create('certifications', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('venture_id')->nullable()->index()->constrained()->nullOnDelete();
            $table->string('type', 32)->default('certificate')->index();
            $table->string('title');
            $table->string('issuer')->nullable();
            $table->string('reference_number')->nullable();
            $table->string('issued_date', 64)->nullable();
            $table->text('description')->nullable();
            $table->json('image')->nullable();
            $table->string('document_path')->nullable();
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
        Schema::dropIfExists('certifications');
    }
};
