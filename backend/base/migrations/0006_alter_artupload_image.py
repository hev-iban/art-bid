# Generated by Django 5.1.1 on 2025-03-16 05:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_alter_artupload_art_price_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artupload',
            name='image',
            field=models.ImageField(upload_to='./media/uploads/'),
        ),
    ]
