from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

GENDER_CHOICES = [
    ('M', 'Male'),
    ('F', 'Female'),
]

SUBJECT_CHOICES = [
    ('Myanmar', 'Myanmar'),
    ('English', 'English'),
    ('Mathematics', 'Mathematics'),
    ('Chemistry', 'Chemistry'),
    ('Physics', 'Physics'),
    ('Biology', 'Biology'),
    ('Economic', 'Economic'),
]

GRADE_CHOICES = [
    (1, 'Grade 1'),
    (2, 'Grade 2'),
    (3, 'Grade 3'),
    (4, 'Grade 4'),
    (5, 'Grade 5'),
    (6, 'Grade 6'),
    (7, 'Grade 7'),
    (8, 'Grade 8'),
    (9, 'Grade 9'),
    (10, 'Grade 10'),
    (11, 'Grade 11'),
    (12, 'Grade 12'),
]

DAY_CHOICES = [
    ('Mon', 'Monday'),
    ('Tue', 'Tuesday'),
    ('Wed', 'Wednesday'),
    ('Thu', 'Thursday'),
    ('Fri', 'Friday'),
    ('Sat', 'Saturday'),
    ('Sun', 'Sunday'),
]

School_Type = [
    ('Private', 'Private'),
    ('Public', 'Public'),
    ('International', 'International'),
    ('Religious', 'Religious'),
    ('Charter', 'Charter'),
    ('Montessori', 'Montessori'),
    ('Homeschool', 'Homeschool'),
    ('Specialized', 'Specialized'),
    ('Alternative', 'Alternative')
]

Grade_Offerings = [
    ('Preschool', 'Preschool'),
    ('Elementary School', 'Grades K-5'),
    ('Middle School', 'Grades 6-8'),
    ('High School', 'Grades 9-12'),
    ('Kindergarten', 'Kindergarten'),
    ('K-12', 'KG to Grade 12')
]


class PrincipalInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=50, choices=GENDER_CHOICES, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    biography = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='principal_pictures/', blank=True, null=True)

    def __str__(self):
        return f"Principal: {self.user.get_full_name()}"

class TeacherInfo(models.Model):
    name = models.CharField(max_length=199)
    age = models.IntegerField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    grade = models.IntegerField(choices=GRADE_CHOICES)
    email = models.EmailField(unique=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    main_subject = models.CharField(max_length=20 , choices=SUBJECT_CHOICES, blank=False)
    
    def __str__(self):
        return self.name


class ClassList(models.Model):
    name = models.CharField(max_length=2)
    grade = models.IntegerField(choices=GRADE_CHOICES)
    class_teacher = models.ForeignKey(TeacherInfo, on_delete=models.SET_DEFAULT, default=None, null=True)
    
    def classTeacherName(self):
        return self.class_teacher.name
    
    def __str__(self):
        return self.name


class StudentInfo(models.Model):
    name = models.CharField(max_length=199)
    age = models.IntegerField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    grade = models.IntegerField(choices=GRADE_CHOICES)
    email = models.EmailField(unique=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    class_name = models.ForeignKey(ClassList, on_delete=models.CASCADE, blank=False)
    
    def className(self):
        return self.class_name.name
    
    def __str__(self):
        return self.name


class TimeTable(models.Model):
    class_name = models.ForeignKey(ClassList, on_delete=models.CASCADE, blank=False)
    day = models.CharField(max_length=4, choices=DAY_CHOICES)
    T_1 = models.CharField(max_length=50, blank=True, null=True)
    T_2 = models.CharField(max_length=50, blank=True, null=True)
    T_3 = models.CharField(max_length=50, blank=True, null=True)
    T_4 = models.CharField(max_length=50, blank=True, null=True)
    T_5 = models.CharField(max_length=50, blank=True, null=True)
    T_6 = models.CharField(max_length=50, blank=True, null=True)
    T_7 = models.CharField(max_length=50, blank=True, null=True)
    
    def className(self):
        return self.class_name.name
    
    def __str__(self):
        return f"Class {self.class_name.name} - Grade {self.class_name.grade} - {self.day}"


class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateTimeField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['date']
        

class Attendance(models.Model):
    student = models.ForeignKey('StudentInfo', on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=[('Present', 'Present'), ('Absent', 'Absent'), ('Late', 'Late')], default='Absent')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['student', 'date'], name='unique_attendance_per_day')
        ]

    def __str__(self):
        return f"{self.student.name} - {self.date} - {self.status}"

class Grade(models.Model):
    student = models.ForeignKey(StudentInfo, on_delete=models.CASCADE, related_name='grades')
    subject = models.CharField(max_length=100, choices=SUBJECT_CHOICES)
    grade = models.CharField(max_length=2)

    def __str__(self):
        return f"{self.student.name} - {self.subject} - {self.grade}"
    

class Overview(models.Model):
    # Basic information about the school
    name = models.CharField(max_length=100, unique=True)
    school_type = models.CharField(max_length=100, choices=School_Type)
    open_at = models.DateField(default=timezone.now)
    grade_offer = models.CharField(max_length=100, choices=Grade_Offerings)
    
    def __str__(self):
        return self.name