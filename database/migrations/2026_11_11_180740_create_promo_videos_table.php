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
        Schema::create('promo_videos', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('venture_id')->nullable()->index()->constrained()->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('source_type', 16)->default('youtube')->index();
            $table->string('youtube_url')->nullable();
            $table->string('youtube_id', 32)->nullable();
            $table->string('video_path')->nullable();
            $table->string('poster_path')->nullable();
            $table->boolean('is_featured')->default(false)->index();
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
        Schema::dropIfExists('promo_videos');
    }
};
