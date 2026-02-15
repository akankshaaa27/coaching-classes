import React, { createContext, useContext, useState, useEffect } from 'react';
import usersData from '../data/users.json';
import coursesData from '../data/courses.json';
import materialsData from '../data/materials.json';
import questionBankData from '../data/questionBank.json';
import mockTestsData from '../data/mockTests.json';
import resultsData from '../data/results.json';
import syllabusData from '../data/syllabus.json';
import subjectsData from '../data/subjects.json';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Authentication State
    // Helper to safely get data from localStorage
    const safeGetItem = (key, defaultValue) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error parsing localStorage key "${key}":`, error);
            // If corruption is found, optional: clear that specific key
            localStorage.removeItem(key);
            return defaultValue;
        }
    };

    // Authentication State
    const [currentUser, setCurrentUser] = useState(
        safeGetItem('user', null)
    );

    // Data Store States (Simulated Database)
    const [users, setUsers] = useState(
        safeGetItem('users', usersData)
    );
    const [courses, setCourses] = useState(
        safeGetItem('courses', coursesData)
    );
    const [materials, setMaterials] = useState(
        safeGetItem('materials', materialsData)
    );
    const [questionBank, setQuestionBank] = useState(
        safeGetItem('questionBank', questionBankData)
    );
    const [mockTests, setMockTests] = useState(
        safeGetItem('mockTests', mockTestsData)
    );
    const [results, setResults] = useState(
        safeGetItem('results', resultsData)
    );
    const [syllabus, setSyllabus] = useState(
        safeGetItem('syllabus', syllabusData)
    );
    const [subjects, setSubjects] = useState(
        safeGetItem('subjects', subjectsData)
    );

    // Persistence Effects
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem('courses', JSON.stringify(courses));
    }, [courses]);

    useEffect(() => {
        localStorage.setItem('materials', JSON.stringify(materials));
    }, [materials]);

    useEffect(() => {
        localStorage.setItem('questionBank', JSON.stringify(questionBank));
    }, [questionBank]);

    useEffect(() => {
        localStorage.setItem('mockTests', JSON.stringify(mockTests));
    }, [mockTests]);

    useEffect(() => {
        localStorage.setItem('results', JSON.stringify(results));
    }, [results]);

    useEffect(() => {
        localStorage.setItem('syllabus', JSON.stringify(syllabus));
    }, [syllabus]);

    useEffect(() => {
        localStorage.setItem('subjects', JSON.stringify(subjects));
    }, [subjects]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('user', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('user');
        }
    }, [currentUser]);

    // Auth Functions
    const login = (email, password) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            return { success: true, user };
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const register = (userData) => {
        const newUser = {
            ...userData,
            id: Date.now().toString(),
            role: userData.role || 'student',
            enrolledCourses: userData.enrolledCourses || [],
            enrolledSubjects: userData.enrolledSubjects || []
        };
        setUsers([...users, newUser]);
        return newUser;
    };

    // CRUD Operations
    const addCourse = (course) => {
        const newCourse = { ...course, id: Date.now().toString() };
        setCourses([...courses, newCourse]);
    };

    const updateCourse = (id, updatedCourse) => {
        setCourses(courses.map(c => c.id === id ? { ...c, ...updatedCourse } : c));
    };

    const deleteCourse = (id) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    const addMaterial = (material) => {
        const newMaterial = { ...material, id: Date.now().toString(), uploadDate: new Date().toISOString().split('T')[0] };
        setMaterials([...materials, newMaterial]);
    };

    const deleteMaterial = (id) => {
        setMaterials(materials.filter(m => m.id !== id));
    };

    const addQuestion = (courseId, topic, questions) => {
        const existing = questionBank.find(q => q.courseId === courseId && q.topic === topic);
        if (existing) {
            setQuestionBank(questionBank.map(item =>
                (item.courseId === courseId && item.topic === topic)
                    ? { ...item, questions: [...item.questions, ...questions] }
                    : item
            ));
        } else {
            setQuestionBank([...questionBank, { courseId, topic, questions }]);
        }
    };

    const addMockTest = (test) => {
        const newTest = { ...test, id: Date.now().toString() };
        setMockTests([...mockTests, newTest]);
    };

    const saveResult = (result) => {
        setResults([...results, { ...result, date: new Date().toISOString().split('T')[0] }]);
    };

    const updateProfile = (userId, data) => {
        setUsers(users.map(u => u.id === userId ? { ...u, ...data } : u));
        if (currentUser && currentUser.id === userId) {
            setCurrentUser({ ...currentUser, ...data });
        }
    };

    const deleteUser = (userId) => {
        setUsers(users.filter(u => u.id !== userId));
    };

    const addSyllabus = (data) => {
        const newSyllabus = { ...data, id: Date.now().toString() };
        setSyllabus([...syllabus, newSyllabus]);
    };

    const updateSyllabus = (id, data) => {
        setSyllabus(syllabus.map(s => s.id === id ? { ...s, ...data } : s));
    };

    const deleteSyllabus = (id) => {
        setSyllabus(syllabus.filter(s => s.id !== id));
    };

    const addSubject = (subject) => {
        const newSubject = { ...subject, id: Date.now().toString() };
        setSubjects([...subjects, newSubject]);
    };

    const updateSubject = (id, data) => {
        setSubjects(subjects.map(s => s.id === id ? { ...s, ...data } : s));
    };

    const deleteSubject = (id) => {
        setSubjects(subjects.filter(s => s.id !== id));
    };

    return (
        <AppContext.Provider value={{
            currentUser,
            users,
            courses,
            materials,
            questionBank,
            mockTests,
            results,
            syllabus,
            login,
            logout,
            register,
            addCourse,
            updateCourse,
            deleteCourse,
            addMaterial,
            deleteMaterial,
            addQuestion,
            addMockTest,
            saveResult,
            updateProfile,
            deleteUser,
            addSyllabus,
            updateSyllabus,
            deleteSyllabus,
            subjects,
            addSubject,
            updateSubject,
            deleteSubject
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
