<template>
  <div v-if="SelectedSessionID === null" class="relative overflow-x-auto shadow-md sm:rounded-lg pt-4">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              <th scope="col" class="px-6 py-3">ID</th>
              <th scope="col" class="px-6 py-3">Наименование</th>
              <th scope="col" class="px-6 py-3">Модуль</th>
              <th scope="col" class="px-6 py-3">Время создания</th>
              <th scope="col" class="px-6 py-3">Статус</th>
              <th scope="col" class="px-6 py-3">
                <a @click.prevent="getModules()" href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Добавить</a>
              </th>
              <th scope="col" class="px-6 py-3">Перейти</th>
          </tr>
      </thead>
      <tbody>
        <tr v-for="item in sessions " :key="item" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
          <td class="px-6 py-4">{{ item.id }}</td>  
          <td class="px-6 py-4 text-gray-900 text-base fort-semibold whitespace-nowrap dark:text-white">{{ item.name }}</td>
          <td class="px-6 py-4">{{ item.module }}</td>
          <td class="px-6 py-4">{{ item.create_time }}</td>
          <td class="px-6 py-4">
            <div v-if="item.status == 'ST1'" class="flex items-center">
              <div class="h-2.5 w-2.5 rounded-full bg-gray-600 me-2" />Создан
            </div>
            <div v-if="item.status == 'ST5'" class="flex items-center">
              <div class="h-2.5 w-2.5 rounded-full bg-green-600 me-2" />В работе
            </div>
            <div v-if="item.status == 'ST6'" class="flex items-center">
              <div class="h-2.5 w-2.5 rounded-full bg-blue-600 me-2" />Завершен
            </div>
            <div v-if="item.status == 'ST7'" class="flex items-center">
              <div class="h-2.5 w-2.5 rounded-full bg-orange-600 me-2" />Остановлен
            </div>
            <div v-if="item.status == 'ST3'" class="flex items-center">
              <div class="h-2.5 w-2.5 rounded-full bg-red-900 me-2" />Ошибка
            </div>
          </td>

          <td class="px-6 py-4">
            <a @click.prevent="DeleteSession(item.id)" href="#" class=" font-medium text-red-600 dark:text-red-500 hover:underline">Удалить сессию</a>
          </td>
          <td class="px-4 py-4">
            <button @click.prevent="SelectedSessionID = item.id" type="button" class="w-16 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <!-- Main modal -->
  <div v-if="selectModule" @click="selectModule = false" class="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40" aria-hidden="true"></div>
  <!-- Модальное окно выбора модуля -->
  <div v-if="selectModule" id="folder-modal" tabindex="-1" aria-hidden="true" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50 w-full max-w-md max-h-full">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Modal content -->
        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Выберите модуль</h3>
            <button @click="selectModule = false" type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-4 md:p-5">
            <form class="space-y-4" action="#">
              <div class="border border-gray-500 mt-3 dark:border-gray-600 w-auto h-96 overflow-y-auto flex flex-col dark:caret-lime-800"> 
                <ul>        
                  <li @click="tselectModule(modl.id)" class="space-y-2 font-medium" v-for="modl in tree" :key="modl" ref="mli" :id="modl.id">
                    <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 8C5.80777 8 5.13108 7.79473 4.55551 7.41015C3.97993 7.02556 3.53133 6.47893 3.26642 5.83939C3.00152 5.19985 2.9322 4.49612 3.06725 3.81719C3.2023 3.13825 3.53564 2.51461 4.02513 2.02513C4.51461 1.53564 5.13825 1.2023 5.81719 1.06725C6.49612 0.932205 7.19985 1.00152 7.83939 1.26642C8.47893 1.53133 9.02556 1.97993 9.41015 2.55551C9.79473 3.13108 10 3.80777 10 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.5 17H1V15C1 13.9391 1.42143 12.9217 2.17157 12.1716C2.92172 11.4214 3.93913 11 5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19.5 11H18.38C18.2672 10.5081 18.0714 10.0391 17.801 9.613L18.601 8.818C18.6947 8.72424 18.7474 8.59708 18.7474 8.4645C18.7474 8.33192 18.6947 8.20476 18.601 8.111L17.894 7.404C17.8002 7.31026 17.6731 7.25761 17.5405 7.25761C17.4079 7.25761 17.2808 7.31026 17.187 7.404L16.392 8.204C15.9647 7.93136 15.4939 7.73384 15 7.62V6.5C15 6.36739 14.9473 6.24021 14.8536 6.14645C14.7598 6.05268 14.6326 6 14.5 6H13.5C13.3674 6 13.2402 6.05268 13.1464 6.14645C13.0527 6.24021 13 6.36739 13 6.5V7.62C12.5081 7.73283 12.0391 7.92863 11.613 8.199L10.818 7.404C10.7242 7.31026 10.5971 7.25761 10.4645 7.25761C10.3319 7.25761 10.2048 7.31026 10.111 7.404L9.404 8.111C9.31026 8.20476 9.25761 8.33192 9.25761 8.4645C9.25761 8.59708 9.31026 8.72424 9.404 8.818L10.204 9.618C9.9324 10.0422 9.73492 10.5096 9.62 11H8.5C8.36739 11 8.24021 11.0527 8.14645 11.1464C8.05268 11.2402 8 11.3674 8 11.5V12.5C8 12.6326 8.05268 12.7598 8.14645 12.8536C8.24021 12.9473 8.36739 13 8.5 13H9.62C9.73283 13.4919 9.92863 13.9609 10.199 14.387L9.404 15.182C9.31026 15.2758 9.25761 15.4029 9.25761 15.5355C9.25761 15.6681 9.31026 15.7952 9.404 15.889L10.111 16.596C10.2048 16.6897 10.3319 16.7424 10.4645 16.7424C10.5971 16.7424 10.7242 16.6897 10.818 16.596L11.618 15.796C12.0422 16.0676 12.5096 16.2651 13 16.38V17.5C13 17.6326 13.0527 17.7598 13.1464 17.8536C13.2402 17.9473 13.3674 18 13.5 18H14.5C14.6326 18 14.7598 17.9473 14.8536 17.8536C14.9473 17.7598 15 17.6326 15 17.5V16.38C15.4919 16.2672 15.9609 16.0714 16.387 15.801L17.182 16.601C17.2758 16.6947 17.4029 16.7474 17.5355 16.7474C17.6681 16.7474 17.7952 16.6947 17.889 16.601L18.596 15.894C18.6897 15.8002 18.7424 15.6731 18.7424 15.5405C18.7424 15.4079 18.6897 15.2808 18.596 15.187L17.796 14.392C18.0686 13.9647 18.2662 13.4939 18.38 13H19.5C19.6326 13 19.7598 12.9473 19.8536 12.8536C19.9473 12.7598 20 12.6326 20 12.5V11.5C20 11.3674 19.9473 11.2402 19.8536 11.1464C19.7598 11.0527 19.6326 11 19.5 11ZM14 14.5C13.5055 14.5 13.0222 14.3534 12.6111 14.0787C12.2 13.804 11.8795 13.4135 11.6903 12.9567C11.5011 12.4999 11.4516 11.9972 11.548 11.5123C11.6445 11.0273 11.8826 10.5819 12.2322 10.2322C12.5819 9.8826 13.0273 9.6445 13.5123 9.54804C13.9972 9.45157 14.4999 9.50108 14.9567 9.6903C15.4135 9.87952 15.804 10.2 16.0787 10.6111C16.3534 11.0222 16.5 11.5055 16.5 12C16.5 12.663 16.2366 13.2989 15.7678 13.7678C15.2989 14.2366 14.663 14.5 14 14.5Z" fill="currentColor"/>
                      </svg>

                      <span class="ms-5">{{ modl.name }}</span>
                      <span class="ml-auto py-1">{{ modl.create_time }}</span>
                    </a>          
                  </li>    
                </ul>
              </div>
              <button @click.prevent="AddSession()"  type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Создать сессию</button>
            </form>
          </div>
        </div>
      </div>
  </div>  

  <!-- AlertForm --> 
  <AlertForm :msg_txt="msg_txt" :msg_id="msg_id" />

  <!-- DetailedSessionForm -->
  <DetailedSessionForm :session_id="SelectedSessionID" @nullate_session_id="SelectedSessionID = null; mount()" />
  
</template>

<script>

import AlertForm from '../Common/AlertForm.vue'
import DetailedSessionForm from '../Common/DetailedSessionForm.vue'

const selectedClassDay = 'bg-gray-100'
const selectedClassDark = 'dark:bg-gray-700'

export default {
  components: {
    AlertForm,
    DetailedSessionForm
  },
  data() {
    return {
      msg_txt: null,
      msg_id: null,
      sessions: null,
      SelectedSessionID: null,
      selectModule: false,
      tree: null,
      selectId: -1
    }
  },
  async mounted() {
    await this.mount()
  },
  methods: {
    async mount() {
      const response = await this.HTTP('GET', '/api/sess/GetSessions', null)
      if (response.success) {
        this.sessions = response.sessions
      } else {
        this.msg_txt = response.msg_txt 
        this.msg_id = 0
      } 
    },
    async AddSession() {
      const response = await this.HTTP('POST', '/api/sess/CreateSession/?id='+this.selectId, null)
      if (response.success) {
        await this.mount()
        this.selectId = -1
        this.selectModule = false
      } else {
        this.msg_txt = response.msg_txt
        this.msg_id = 0
      }
    },
    async DeleteSession(index) {
      const response = await this.HTTP('GET', '/api/sess/DeleteSession/?id='+index, null)
      if (response.success) {
        await this.mount()
      } else {
        this.msg_txt = response.msg_txt
        this.msg_id = 0
      }      
    },
    async getModules() {
      this.selectModule = true
      this.msg_txt = ''
      this.msg_id = 0

      const response = await this.HTTP('GET', '/api/modl/GetModules', null)
      if (response.success) {
        this.tree = response.modules
      } else {
        this.msg_txt = response.msg_txt
        this.msg_id = 0
      }
      
    },
    tselectModule(id) {
      this.selectId = id
      this.$refs.mli.forEach(async (element) => {
        if (id == element.id) {
          element.classList.add(selectedClassDay)
          element.classList.add(selectedClassDark)
        } else {
          element.classList.remove(selectedClassDay)
          element.classList.remove(selectedClassDark)
        }
      })
    }
  }
}

</script>