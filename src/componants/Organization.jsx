"use client"
import React, { useState } from 'react';
import { Layout,  Select, Space, Typography, Checkbox,  TimePicker } from 'antd';
const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}
const { Option } = Select;
const { Header,  Content } = Layout;

// the selected values from input select
const handleChange = (value) => {
    console.log(`Selected: ${value}`);
};

// the selected day from checkbox
const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
};

// the input days options
const plainOptions = [
    {
        label: 'Monday',
        value: 'Monday',
    },
    {
        label: 'Tuesday',
        value: 'Tuesday',
    },
    {
        label: 'Wednesday',
        value: 'Wednesday',
    },
    {
        label: 'Thursday',
        value: 'Thursday',
    },
    {
        label: 'Friday',
        value: 'Friday',
    },
    {
        label: 'Saturday',
        value: 'Saturday',
    },
    {
        label: 'Sunday',
        value: 'Sunday',
    },
];

//the time function
const timeFunc = (time, timeString) => {
    console.log(time, timeString);
};

const Organization = () => {
    // size attribute
    const [size] = useState('middle');

    return (
        <>
        {/* the title of the section */}
            <Typography.Title level={3}>
                Organization Settings
            </Typography.Title>
            {/* the black header */}
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
                    Organization
                </Typography.Title>
                {/* the select input */}
                <Space
                    direction="vertical"
                    style={{
                        width: '22%',
                    }}
                >
                    <Select
                        size={size}
                        defaultValue="Microsoft (Default Organization)"
                        onChange={handleChange}
                        style={{
                            width: 200,
                        }}
                        options={options}
                    />
                </Space>
            </Header>

            <Content>
                {/* check box */}
                <Typography.Text style={{ color: '#B3B3B3', margin: '10px 0', display: 'block' }}>
                    Business Operating Days
                </Typography.Text>
                <div>
                    <Checkbox.Group style={{ margin: '10px 0' }} options={plainOptions} defaultValue={['']} onChange={onChange} />
                </div>
                {/* the all select inputs */}
                <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1.25rem' }}>
                        <Typography.Text style={{ color: "#B3B3B3", margin: '20px 0', display: 'block' }}>First Day of the Business Week</Typography.Text>
                        <Typography.Text style={{ color: "#B3B3B3", margin: '20px 0', display: 'block' }}>Business Operating Hours</Typography.Text>
                        <Typography.Text style={{ color: "#B3B3B3", margin: '20px 0', display: 'block' }}>Business Operating Timezone</Typography.Text>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1.25rem', alignItems: 'flex-end' }}>
                        {/* First Day of the Week */}
                        <div style={{ margin: '10px 0', display: 'block' }}>
                            <span style={{ color: '#B3B3B3', display: 'block', fontSize: '12px' }}>First Day of the Week</span>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '30%',
                                }}
                            >

                                <Select
                                    size={size}
                                    defaultValue="Monday"
                                    onChange={handleChange}
                                    bordered={false}
                                    style={{
                                        width: 200,
                                        borderBottom: '2px solid #000',
                                    }}
                                >
                                    {plainOptions.map((option) => (
                                        <Option key={option.value} value={option.value}>
                                            <div >
                                                <span>{option.label}</span>
                                            </div>
                                        </Option>
                                    ))}
                                </Select>
                            </Space>
                        </div>
                            {/* inputs  Business Day  Time */}
                        <div style={{ display: 'flex', gap: '80px', justifyContent: 'center' }}>
                           {/* inputs  Business Day start Time */}
                            <div>
                                <span style={{ color: '#B3B3B3', display: 'block', fontSize: '12px' }}>Business Day Start Time</span>
                                <Space
                                    direction="vertical"
                                    style={{
                                        width: 200,
                                        margin: '0 0px',
                                        borderBottom: '2px solid #000'
                                    }}
                                >

                                    <TimePicker size={size} bordered={false}
                                        style={{
                                            width: 200,
                                            borderBottom: '2px solid #000',
                                        }} use12Hours onChange={timeFunc} format="h:mm A" />
                                </Space>
                            </div>
                            {/* inputs  Business Day End Time */}
                            <div>
                                <span style={{ color: '#B3B3B3', display: 'block', fontSize: '12px' }}>Business Day End Time</span>
                                <Space
                                    direction="vertical"
                                    style={{
                                        width: 200,
                                        borderBottom: '2px solid #000'
                                    }}
                                >

                                    <TimePicker size={size} bordered={false}
                                        style={{
                                            width: 200,
                                            borderBottom: '2px solid #000',
                                        }} use12Hours onChange={timeFunc} format="h:mm A" />
                                </Space>
                            </div>
                        </div>
                        {/* Timezone */}
                        <div>
                            <span style={{ color: '#B3B3B3', display: 'block', fontSize: '12px' }}>Timezone</span>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '30%',
                                }}
                            >

                                <Select
                                    size={size}
                                    defaultValue="Monday"
                                    onChange={handleChange}
                                    bordered={false}
                                    style={{
                                        width: 200,
                                        borderBottom: '2px solid #000',
                                    }}
                                >
                                    {plainOptions.map((option) => (
                                        <Option key={option.value} value={option.value}>
                                            <div >
                                                <span>{option.label}</span>
                                            </div>
                                        </Option>
                                    ))}
                                </Select>
                            </Space>
                        </div>
                    </div>
                </div>
            </Content>

        </>
    )
}

export default Organization