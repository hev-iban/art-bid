# Generated by Django 5.1.1 on 2025-03-15 18:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Art',
        ),
        migrations.RemoveField(
            model_name='artupload',
            name='id',
        ),
        migrations.AddField(
            model_name='artupload',
            name='art_id',
            field=models.AutoField(default=2, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='artupload',
            name='art_name',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='artupload',
            name='art_price',
            field=models.DecimalField(decimal_places=2, default=6, max_digits=10),
            preserve_default=False,
        ),
    ]
