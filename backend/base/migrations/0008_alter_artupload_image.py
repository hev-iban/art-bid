# Generated by Django 5.1.1 on 2025-03-17 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_alter_artupload_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artupload',
            name='image',
            field=models.ImageField(upload_to='media/uploads'),
        ),
    ]
