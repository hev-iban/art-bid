# Generated by Django 5.1.1 on 2025-03-16 04:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_artupload_current_bid_alter_artupload_art_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artupload',
            name='art_price',
            field=models.DecimalField(decimal_places=2, max_digits=1000000),
        ),
        migrations.AlterField(
            model_name='artupload',
            name='current_bid',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10000000),
        ),
        migrations.CreateModel(
            name='Bid',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bid_amount', models.DecimalField(decimal_places=2, max_digits=10000)),
                ('bidder', models.CharField(default='Anonymous', max_length=10000)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('art', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bids', to='base.artupload')),
            ],
        ),
    ]
