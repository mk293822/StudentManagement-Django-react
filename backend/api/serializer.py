from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__' 

class PrincipalInfoSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = PrincipalInfo
        fields = ['user', 'phone_number', 'age', 'gender', 'address', 'biography', 'profile_picture']


class TeacherInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherInfo
        fields = ['id', 'name', 'age', 'gender', 'grade', 'email', 'main_subject', 'image']

class ClassListSerializer(serializers.ModelSerializer):
    classTeacherName = serializers.SerializerMethodField()

    class Meta:
        model = ClassList
        fields = ['id', 'name', 'grade', 'class_teacher', 'classTeacherName']
        
    def get_classTeacherName(self, obj):
        return obj.class_teacher.name if obj.class_teacher else None


class StudentInfoSerializer(serializers.ModelSerializer):
    className = serializers.SerializerMethodField()

    class Meta:
        model = StudentInfo
        fields = ['id', 'name', 'age', 'gender', 'grade', 'email', 'image', 'class_name', 'className']

    def get_className(self, obj):
        return obj.class_name.name if obj.class_name else None


class TimeTableSerializer(serializers.ModelSerializer):
    className = serializers.SerializerMethodField()

    class Meta:
        model = TimeTable
        fields = ['id', 'class_name', 'className', 'day', 'T_1', 'T_2', 'T_3', 'T_4', 'T_5', 'T_6', 'T_7']
        
    def get_className(self, obj):
        return obj.class_name.name if obj.class_name else None


# Serializers for the additional features

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'date', 'created_at', 'updated_at']


class AttendanceSerializer(serializers.ModelSerializer):
    status = serializers.ChoiceField(choices=[('Present', 'Present'), ('Absent', 'Absent'), ('Late', 'Late')])

    class Meta:
        model = Attendance
        fields = ['id', 'student', 'date', 'status']


class GradeSerializer(serializers.ModelSerializer):
    subject = serializers.ChoiceField(choices=SUBJECT_CHOICES)
    grade = serializers.CharField(max_length=2)

    class Meta:
        model = Grade
        fields = ['id', 'student', 'subject', 'grade']

class OverViewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Overview
        fields = [
            'id', 
            'name', 
            'school_type', 
            'open_at', 
            'grade_offer',  
        ]