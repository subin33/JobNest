<template>
    <div class="form-container" v-if="isLogin">
      <div class="top-info-box">
        <img src="/vite.svg" alt="profile">
        <div class="right-info">
          <span class="name">{{ name }}</span>
          <address>{{ addr }}</address>
        </div>
      </div>
      <div class="text-info">
        <h4>자기소개</h4>
        <p>
         {{ text }}
        </p>
      </div>
      <button class="logout" @click="handleLogout">
        로그아웃
      </button>

      <details class="job-list">
        <summary>내 지원내역</summary>
        <p v-for="job in job_apply_list" :key="job.id">
          <span>[지원완료] {{  job.job_title }}</span>
          <time>{{ new Date(job.created_at).toLocaleDateString() }}</time>
        </p>
      </details>
      <details class="job-list" >
        <summary>받은 지원내역</summary>
        <p v-for="job in job_recieve_list" :key="job.id">
          <span>{{ job.applicant_name }}님이 <q>{{ job.job_title }}</q>에 지원했습니다.</span>
          <time>{{ new Date(job.created_at).toLocaleDateString() }}</time>
        </p>
      </details>
    </div>
</template>
<script setup>
import { useAuth } from '../auth/auth';
import supabase from '../supabase';
import { onMounted , ref} from 'vue';
import { useRouter } from 'vue-router';

const { isLogin, user, checkLoginStatus } = useAuth(); // 로그인 상태 확인 함수 가져오기
const router = useRouter();

const name = ref('사용자 이름');
const addr = ref('사용자 주소');
const text = ref('IT와 웹 개발에 대한 열정을 가진 개발자입니다. Vue.js와 JavaScript에 강점을 두고 있으며, 효율적인 코드와 창의적인 문제 해결에 집중합니다. 성장과 도전을 통해 더 나은 결과를 만들기 위해 노력하고 있습니다.')

const job_apply_list = ref([]);
const job_recieve_list = ref([]);

// 받은 지원내역 가져오는 함수
const getRecieveList = async () => {
  const { data, error } = await supabase
    .from('job_apply_list')
    .select()
    .eq('employer_id', user.value.id)
  
    if(error) {
      alert('받은 지원내역 가져오기 실패');
    } else {
      job_recieve_list.value = data;
      console.log('job_recieve_list:', job_recieve_list.value);
    }  
}

const getApplyList = async () => {
  const {data, error} = await supabase
    .from('job_apply_list')
    .select()
    .eq('applicant_id', user.value.id)

  if(error){
    alert('지원내역 가져오기 실패')
  } else {
    job_apply_list.value = data;
    console.log(job_apply_list.value)
  }
}


const handleLogout = async () => {
  const conf = confirm('로그아웃 하시겠습니까?');
  if(!conf) return;
  
  const { error } = await supabase.auth.signOut();

  if(error){
    alert('로그아웃 실패')
  }else {
    alert('로그아웃 성공')
    router.push('/')
  }

}

//마운트시 로그인 상태 확인하기 
onMounted(async() => {
  await checkLoginStatus();
  await getApplyList();
  await getRecieveList();

  // user_table에서 사용자 정보 가져오기 ( 기존 삭제한 코드 참조 )
  const { data, error } = await supabase
    .from('user_table')
    .select()
    .eq('id',user.value.id)
    .single()
  // console.log('user_table', data);
  name.value = data.name;
  addr.value = data.addr;
  text.value = data.text;

})

</script>
<style lang="scss" scoped>
  button {
    background-color: transparent;
    color: var(--main-color);
    font-size: 16px;
    margin-top: 40px;
    &:hover{
      opacity: 0.7;
      text-decoration: underline;
    }
  }  
  .form-container {
    margin-top: 20px;
  }

  .top-info-box {
    display: flex;
    align-items: center;
    margin-bottom: 40px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 12px;
    }

    .right-info {
      width: 100%;
      line-height: 1.4;
  
      .name {
        font-size: 16px;
        font-weight: 600;
      }
      address {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        color: #777;
      }
    }
  }

  .text-info {
    margin-bottom: 25px;
    h4 {
      margin-bottom: 8px;
    }
    p {
      font-size: 14px;
      color: #333;
      line-height: 20px;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      padding: 12px 1rem;
    }
  }
  .job-list {
    list-style-type: none;
    font-size: 14px;
    padding: 1rem 0;
    
    summary {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #d9d9d9;
    }

    p {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      time {
        color: #777;
        font-size: 12px;
        font-weight: 400;
        width: 10em;
        // outline: 1px solid red;
        text-align: right;
      }
    }

    q { font-weight: bold;}
  }
</style>

