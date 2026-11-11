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
        Schema::create('inquiries', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('venture_id')->nullable()->index()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('phone', 32);
            $table->string('email')->nullable();
            $table->string('city_region')->nullable();
            $table->string('interest_division')->index();
            $table->string('subject');
            $table->text('message');
            $table->string('source_page', 64)->default('contact');
            $table->string('status', 32)->default('new')->index();
            $table->boolean('email_sent')->default(false);
            $table->text('whatsapp_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
