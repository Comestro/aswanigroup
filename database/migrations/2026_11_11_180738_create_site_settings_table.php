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
        Schema::create('site_settings', function (Blueprint $table): void {
            $table->id();
            $table->string('company_name')->default('Ashwin Group');
            $table->string('company_full_name')->default('Ashwin Group of Companies');
            $table->string('tagline')->nullable();
            $table->text('hero_description')->nullable();
            $table->string('est_year', 16)->default('1995');
            $table->string('logo_path')->default('/images/logo.png');

            $table->string('founder_name')->nullable();
            $table->string('founder_title')->nullable();
            $table->text('chairman_quote')->nullable();
            $table->longText('chairman_message')->nullable();
            $table->string('chairman_image')->default('/images/chairman-portrait.png');
            $table->text('vision_text')->nullable();
            $table->text('mission_text')->nullable();
            $table->json('core_values')->nullable();
            $table->json('timeline_items')->nullable();
            $table->json('hero_stats')->nullable();

            $table->string('hq_address')->nullable();
            $table->string('office_hours')->nullable();
            $table->string('primary_phone', 32)->nullable();
            $table->string('secondary_phone', 32)->nullable();
            $table->string('whatsapp_number', 32)->nullable();
            $table->string('primary_email')->nullable();
            $table->string('distributor_email')->nullable();
            $table->string('inquiry_recipient_email')->nullable();
            $table->string('footer_regions')->nullable();
            $table->text('footer_summary')->nullable();
            $table->json('social_links')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
