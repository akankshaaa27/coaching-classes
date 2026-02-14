import React, { createContext, useContext, useState, useEffect } from 'react';
import usersData from '../data/users.json';
import coursesData from '../data/courses.json';
import materialsData from '../data/materials.json';
import questionBankData from '../data/questionBank.json';
import mockTestsData from '../data/mockTests.json';
import resultsData from '../data/results.json';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Authentication State
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    // Data Store States (Simulated Database)
    const [users, setUsers] = useState(
        JSON.parse(localStorage.getItem('users')) || usersData
    );
    const [courses, setCourses] = useState(
        JSON.parse(localStorage.getItem('courses')) || coursesData
    );
    const [materials, setMaterials] = useState(
        JSON.parse(localStorage.getItem('materials')) || materialsData
    );
    const [questionBank, setQuestionBank] = useState(
        JSON.parse(localStorage.getItem('questionBank')) || questionBankData
    );
    const [mockTests, setMockTests] = useState(
        JSON.parse(localStorage.getItem('mockTests')) || mockTestsData
    );
    const [results, setResults] = useState(
        JSON.parse(localStorage.getItem('results')) || resultsData
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
            role: 'student',
            enrolledCourses: []
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

    return (
        <AppContext.Provider value={{
            currentUser,
            users,
            courses,
            materials,
            questionBank,
            mockTests,
            results,
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
            updateProfile
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
