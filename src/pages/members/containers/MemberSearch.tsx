import { Button, Form, FormInstance, Input, Select } from "antd";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { useJobDeptSearch } from "../../../config/hook/useJobDeptSearch";
import { searchAPI } from "../../../libs/api/searchAPI";

const employeeOptions = [
  {
    label: "Employed",
    value: "employed",
  },
  {
    label: "Unemployed",
    value: "unemployed",
  },
  {
    label: "Student",
    value: "student",
  },
];

type MemberSearchProps = {
  onClear: () => void;
  form: FormInstance;
};
const MemberSearch = ({ onClear, form }: MemberSearchProps) => {
  const { data: batchData } = useQuery(["batch-list"], () =>
    searchAPI.getBatchList()
  );
  const { data: occupationData } = useQuery(["occupation-list"], () =>
    searchAPI.getOccupationList()
  );
  const { filter, jobDept: jobDeptData } = useJobDeptSearch();

  const handleClear = useCallback(() => {
    form.setFieldsValue({
      name: undefined,
      company: undefined,
      designation: undefined,
      job_department: undefined,
      location: undefined,
      occupation_type: undefined,
      student_id: undefined,
      batch: undefined,
      skills: undefined,
      employment_status: undefined,
    });
    onClear();
  }, [form, onClear]);

  return (
    <>
      <div className="flex flex-col gap-4 overflow-auto max-h-[calc(100vh-420px)]">
        {/* Single column layout for mobile */}
        <Form.Item name="name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="designation">
          <Input placeholder="Designation" />
        </Form.Item>
        <Form.Item name="student_id">
          <Input placeholder="Student id" />
        </Form.Item>
        <Form.Item name="location">
          <Input placeholder="Location" />
        </Form.Item>
        <Form.Item name="company">
          <Input placeholder="Company" />
        </Form.Item>
        <Form.Item name="employment_status">
          <Select placeholder="Employee Status" options={employeeOptions} />
        </Form.Item>
        <Form.Item name="batch">
          <Select
            placeholder="Batch"
            options={batchData?.data?.map(({ id, name }) => ({
              key: id,
              value: id?.toString(),
              label: name,
            }))}
          />
        </Form.Item>
        <Form.Item name="occupation_type">
          <Select
            placeholder="Occupation"
            options={occupationData?.data?.map(({ id, name }) => ({
              key: id,
              value: id?.toString(),
              label: name,
            }))}
          />
        </Form.Item>
        <Form.Item name="job_department">
          <Select
            onSearch={filter.handleChangeJobDept}
            showSearch
            allowClear
            placeholder="Job department"
            options={jobDeptData?.data?.map(({ id, name }) => ({
              key: id,
              value: id?.toString(),
              label: name,
            }))}
          />
        </Form.Item>
        <Form.Item name="skills">
          <Input placeholder="Skills" />
        </Form.Item>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button htmlType="reset" onClick={handleClear}>
          Reset
        </Button>
        <Button type="primary" htmlType="submit" onClick={form.submit}>
          Apply
        </Button>
      </div>
    </>
  );
};

export default MemberSearch;
