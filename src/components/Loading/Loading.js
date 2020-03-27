import React from 'react';
import styles from './Loading.module.css';

const Loading = () =>{
    return (
    <div className={styles.Loading}>
        <p className={styles.p}>Завантажую...</p>
    </div>
)};

export default Loading;