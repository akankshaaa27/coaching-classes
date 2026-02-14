import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './context/AppContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Results from './pages/Results';
import Faculty from './pages/Faculty';
import Gallery from './pages/Gallery';
import StudyMaterial from './pages/StudyMaterial';
import Admission from './pages/Admission';
import Contact from './pages/Contact';
import Syllabus from './pages/Syllabus';
import Timetable from './pages/Timetable';
import Login from './pages/Login';

// Dashboard Pages
import DashboardHero from './pages/dashboard/DashboardHero';
import EnrolledCourses from './pages/dashboard/student/EnrolledCourses';
import MockTests from './pages/dashboard/student/MockTests';
import MockTestPlayer from './pages/dashboard/student/MockTestPlayer';
import StudentResults from './pages/dashboard/student/StudentResults';
import StudentMaterials from './pages/dashboard/student/StudentMaterials';
import StudentProfile from './pages/dashboard/student/StudentProfile';

// Teacher Pages
import TeacherMaterials from './pages/dashboard/teacher/TeacherMaterials';
import TeacherQuestions from './pages/dashboard/teacher/TeacherQuestions';
import TeacherMockTests from './pages/dashboard/teacher/TeacherMockTests';
import TeacherStudentResults from './pages/dashboard/teacher/TeacherStudentResults';

// Admin Pages
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import AdminUsers from './pages/dashboard/admin/AdminUsers';
import AdminCourses from './pages/dashboard/admin/AdminCourses';

const PrivateRoute = ({ children, role }) => {
    const { currentUser } = useAppContext();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (role && currentUser.role !== role) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/about" element={<MainLayout><About /></MainLayout>} />
            <Route path="/courses" element={<MainLayout><Courses /></MainLayout>} />
            <Route path="/results" element={<MainLayout><Results /></MainLayout>} />
            <Route path="/faculty" element={<MainLayout><Faculty /></MainLayout>} />
            <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} />
            <Route path="/study-material" element={<MainLayout><StudyMaterial /></MainLayout>} />
            <Route path="/admission" element={<MainLayout><Admission /></MainLayout>} />
            <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
            <Route path="/syllabus" element={<MainLayout><Syllabus /></MainLayout>} />
            <Route path="/timetable" element={<MainLayout><Timetable /></MainLayout>} />
            <Route path="/login" element={<Login />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={
                <PrivateRoute>
                    <DashboardLayout />
                </PrivateRoute>
            }>
                <Route index element={<DashboardHero />} />

                {/* Student Routes */}
                <Route path="student/courses" element={<EnrolledCourses />} />
                <Route path="student/mock-tests" element={<MockTests />} />
                <Route path="student/mock-test/:id" element={<MockTestPlayer />} />
                <Route path="student/results" element={<StudentResults />} />
                <Route path="student/materials" element={<StudentMaterials />} />
                <Route path="student/profile" element={<StudentProfile />} />

                {/* Teacher Routes */}
                <Route path="teacher/materials" element={<PrivateRoute role="teacher"><TeacherMaterials /></PrivateRoute>} />
                <Route path="teacher/questions" element={<PrivateRoute role="teacher"><TeacherQuestions /></PrivateRoute>} />
                <Route path="teacher/mock-tests" element={<PrivateRoute role="teacher"><TeacherMockTests /></PrivateRoute>} />
                <Route path="teacher/results" element={<PrivateRoute role="teacher"><TeacherStudentResults /></PrivateRoute>} />

                {/* Admin Routes */}
                <Route path="admin" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
                <Route path="admin/users" element={<PrivateRoute role="admin"><AdminUsers /></PrivateRoute>} />
                <Route path="admin/courses" element={<PrivateRoute role="admin"><AdminCourses /></PrivateRoute>} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
