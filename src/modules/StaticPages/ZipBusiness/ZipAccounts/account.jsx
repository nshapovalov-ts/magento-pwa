import React from 'react';

import Button from 'components/Button';
import labelIcon from '../assets/label_icon_bg.png';

import classes from './account.module.css';

const Account = ({ data }) => {
    const getHeader = () => {
        return data.type === 'popular' ? (
            <div className={classes.header}>
                {data.title}
                <img src={labelIcon} alt={data.title} />
            </div>
        ) : (
            <div className={classes.headerNew}>{data.title}</div>
        );
    };

    return (
        <div className={classes.container}>
            <div className={classes.account}>
                <div>
                    {getHeader()}
                    <div className={classes.sum}>
                        <p>{data.name}</p>
                        <h3>{data.sum}</h3>
                    </div>
                    <div className={classes.accountTable}>
                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>{data.description}</td>
                                </tr>
                                {data.tableData.map(item => {
                                    return (
                                        <tr key={item.name}>
                                            <th>{item.name}</th>
                                            <td>{item.value}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={classes.buttonContainer}>
                    <Button
                        component="link"
                        variant="contained"
                        classes={{ root: classes.button }}
                        to={{ pathname: data.button.path }}
                        target="_blank"
                    >
                        {data.button.title}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Account;
