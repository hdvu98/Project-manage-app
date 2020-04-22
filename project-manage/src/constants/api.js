const URL = "http://localhost:3000";

const CREATE_MEMBER = `${URL}/member/create`;
const GET_ALL_MEMBERS = `${URL}/member/get`;
const GET_MEMBER = `${URL}/member/get`;
const UPDATE_MEMBER = `${URL}/member/update`;
const REMOVE_MEMBER = `${URL}/member/remove`;

const CREATE_PROJECT = `${URL}/project/create`;
const GET_ALL_PROJECTS = `${URL}/project/get`;
const GET_PROJECT = `${URL}/project/get`;
const UPDATE_PROJECT = `${URL}/project/update`;
const REMOVE_PROJECT = `${URL}/project/remove`;
const ASSIGN = `${URL}/project/assign`;
const REMOVE_MEMBER_FROM_PROJECT = `${URL}/project/remove-member`;
const GET_AVAILABLE_MEMBERS = `${URL}/project/get-available-member`;

export {
  CREATE_MEMBER,
  GET_ALL_MEMBERS,
  GET_MEMBER,
  UPDATE_MEMBER,
  REMOVE_MEMBER,
  CREATE_PROJECT,
  GET_ALL_PROJECTS,
  GET_PROJECT,
  UPDATE_PROJECT,
  REMOVE_PROJECT,
  ASSIGN,
  REMOVE_MEMBER_FROM_PROJECT,
  GET_AVAILABLE_MEMBERS,
};
