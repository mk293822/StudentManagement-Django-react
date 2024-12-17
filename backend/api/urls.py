from django.urls import path
from . import views

urlpatterns = [
    path('StudentInfo/', views.StudentInfoView.as_view(), name='student-info'),
    path('ClassList/', views.ClassListView.as_view(), name='class-list'),
    path('TeacherInfo/', views.TeacherInfoView.as_view(), name='teacher-info'),
    path('TimeTable/', views.TimeTableView.as_view(), name='time-table'),
    path('Event/', views.EventView.as_view(), name='event'),
    path('Attendance/', views.AttendanceView.as_view(), name='attendance'),
    path('Grade/', views.GradeView.as_view(), name='grade'),
    path('OverView/', views.OverviewView.as_view(), name='overview'),
    path('Principal/', views.PrincipalInfoView.as_view(), name='principal')
]
