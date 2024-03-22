<template>                               <!-- Надо будет убрать border border-gray-500 --> 
  <div v-if="session_id !== null" class=" mt-3 dark:caret-lime-800 w-auto h-auto overflow-y-auto flex flex-col dark:text-white"> 
    <div v-if="!ShowResults">
    <div class="flex justify-between items-center mb-4 px-5 pt-2">
      <button @click.prevent="$emit('nullate_session_id')" type="button" class="w-44 h-11 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-6 h-6 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">        
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>          
        </svg>
        Назад к сессиям
      </button>
      
      <div class="flex-1 flex items-center px-3">
        <div class="pr-2">
          Время создания: {{ session.create_time }}
        </div>
        <input v-model="name_value" type="text" name="name" id="name" class="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-800 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Введите наименование" required>          
        <svg @click="AlterField('name', name_value)" class="pl-2 w-12 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
        </svg>        
        <svg @click="name_value = session.name" class="pl-2 w-12 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>  
      </div>
      
      <button @click="ShowResults = true" class="w-52 h-11 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Перейти к результатам
        <svg class="w-6 h-6 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
        </svg>        
      </button>
    </div>

    <!-- Кнопки в левой части -->
    <div class="flex items-center mb-1 px-5">
      <button v-if="session.module_type == 'MT1'" @click.prevent="ItemSelect(1, 0)" class="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-44">Комбо лист(пресет)</button>
      <button v-if="session.module_type == 'MT2'" @click.prevent="ItemSelect(1, 0)" class="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40">Хосты(пресет)</button>
      <button v-if="session.module_type == 'MT2'" @click.prevent="ItemSelect(1, 1)" class="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40">Логины(пресет)</button>
      <button v-if="session.module_type == 'MT2'" @click.prevent="ItemSelect(1, 2)" class="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40">Пароли(пресет)</button>
      <button @click.prevent="ItemSelect(2, 0)" class="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-44">Прокси(пресет)</button>
      <button @click.prevent="AlterField('status', 'ST5')" class="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40">Запустить</button>
      <label for="numberBox" class="mr-4 text-sm font-medium text-gray-400 dark:text-gray-500 w-12">Потоки</label>
      <input v-model="worker_count_value" id="numberBox" type="number" class="w-36 px-4 py-2.5 text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
      <svg @click="AlterField('worker_count', worker_count_value)" class="pl-2 w-12 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
      </svg>        
      <svg @click="worker_count_value = session.worker_count" class="pl-2 w-12 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg> 
    </div>

    <div class="flex items-center mb-3 px-5">
      <button v-if="session.module_type == 'MT1'" @click.prevent="ItemSelect(3, 0)" class="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-44">Комбо лист(файл)</button>
      <button v-if="session.module_type == 'MT2'" @click.prevent="ItemSelect(3, 0)" class="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40">Хосты(файл)</button>
      <button v-if="session.module_type == 'MT2'" @click.prevent="ItemSelect(3, 1)" class="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40">Логины(файл)</button>
      <button v-if="session.module_type == 'MT2'" @click.prevent="ItemSelect(3, 2)" class="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40">Пароли(файл)</button>
      <button @click.prevent="ItemSelect(4, 0)" class="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-44">Прокси(файл)</button>
      <button @click.prevent="AlterField('status', 'ST7')" class="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40">Остановить</button>      
      <label for="numberBox" class="mr-4 text-sm font-medium text-gray-400 dark:text-gray-500 w-12">Таймаут</label>
      <input v-model="timeout_value" id="numberBox" type="number" class="w-36 px-4 py-2.5 text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
      <svg @click="AlterField('timeout', timeout_value)" class="pl-2 w-12 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
      </svg>        
      <svg @click="timeout_value = session.timeout" class="pl-2 w-12 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg> 
    </div>

    <!--Поля ввода -->
    <div v-if="session.inputs != null" class="px-5 pt-2 mt-3 h-44 overflow-y-auto p-2 space-y-2 font-medium text-gray-900">        
      <div class="flex text-sm font-medium">      
        <div class="px-5 w-5/5">
          
          <div class="flex justify-between items-center">
            <h1 class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Формы ввода</h1>
            <button @click.prevent="ApplyInputFields()" type="button" class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
              Применить изменения форм ввода
            </button>          
          </div>
          <hr class="border border-gray-500 mt-1 mb-1">
          
          <ul class="grid gap-2 md:grid-cols-7 h-11 ml-2">
            <li v-for="input in session.inputs" :key="input.id" class="font-thin w-full md:w-auto">
              <div class="flex flex-col">
                <label v-if="input.type !== 'IT4'" :for="input.id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ input.description }}</label>
                <div v-if="input.type === 'IT1' || input.type === 'IT2'">
                  <input v-model="input.value" :type="input.type === 'IT2' ? 'number' : 'text'" :id="input.id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" :placeholder="input.placeholder || 'Введите значение'">
                </div>
                <div v-else-if="input.type === 'IT3'">
                  <textarea v-model="input.value" :id="input.id" rows="6" class="block p-2.5 h-20 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="input.placeholder || 'Наберите текст...'"></textarea>
                </div>
                <div v-else-if="input.type === 'IT4'">
                  <input v-model="input.value" type="checkbox" class="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label :for="input.id" class="ms-2 text-sm font-medium text-gray-900 dark:text-white">{{ input.description }}</label>                
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>    

    <!-- Статистика -->
    <div class="px-5 pt-2 mt-3 h-auto overflow-y-auto p-2 space-y-2 font-medium text-gray-900">        
      <div class="flex">      
        <div class="px-5 w-4/5">
          <h1 class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Параметры</h1>
          <hr class="border border-gray-500 mt-2 mb-2">  
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              <tr v-if="session.module_type == 'MT1'" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">Выбранный комбо лист</th>
                <td class="px-4 py-2">{{ session.database_name }}</td>
              </tr>
              <tr v-if="session.module_type == 'MT2'" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">Выбранные хосты</th>
                <td class="px-4 py-2">{{ session.database_name }}</td>
              </tr>
              <tr v-if="session.module_type == 'MT2'" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">Выбранные логины</th>
                <td class="px-4 py-2">{{ session.username_name }}</td>
              </tr>
              <tr v-if="session.module_type == 'MT2'" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">Выбранные пароли</th>
                <td class="px-4 py-2">{{ session.password_name }}</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">Выбранный прокси пресет</th>
                <td class="px-4 py-2">{{ session.proxy_name }}</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">Выбранный модуль</th>
                <td class="px-4 py-2">{{ session.module_name }}</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">Статус</th>
                <td class="px-4 py-2 flex items-center">
                  <div v-if="session.status == 'Создан'" class="h-2.5 w-2.5 rounded-full bg-gray-600 me-2" />
                  <div v-if="session.status == 'В работе'" class="h-2.5 w-2.5 rounded-full bg-green-600 me-2" />
                  <div v-if="session.status == 'Завершен'" class="h-2.5 w-2.5 rounded-full bg-blue-600 me-2" />
                  <div v-if="session.status == 'Остановлен'" class="h-2.5 w-2.5 rounded-full bg-orange-600 me-2" />
                  <div v-if="session.status == 'Ошибка'" class="h-2.5 w-2.5 rounded-full bg-red-900 me-2" />
                  {{ session.status }}
                </td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">Время начала</th>
                <td class="px-4 py-2">{{ session.start_time }}</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">Время завершения</th>
                <td class="px-4 py-2">{{ session.finish_time }}</td>
              </tr>
            </tbody>
          </table>      
        </div>

        <div class="px-5 w-4/5 relative overflow-x-auto">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold whitespace-nowrap dark:text-white">Статистика</h1>
            <svg @click="RefreshStatistic" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
            </svg>
          </div>
          <hr class="border border-gray-500 mt-2 mb-2">

          <div class="max-h-56 overflow-y-auto"> <!-- max-h-64 это 7 элементов -->
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr v-for="item in session.result" :key="item" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ item.name }}</th>
                  <td class="px-4 py-2">{{ item.count }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- ProgressBar -->
      <div class="px-5">
        <div class="w-full bg-gray-200 dark:bg-gray-700">
          <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none py-1" :style="{ width: session.statistic.percent }">{{ session.statistic.percent }}</div>
        </div>
      </div>

      <!-- Statistic for WEB/API -->
      <div v-if="session.module_type == 'MT1'" class="px-5">
        <ul class="flex w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="flex-1 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center px-3 py-1">
              <label for="horizontal-list-radio-license" class="w-full text-gray-900 dark:text-gray-300">Строк в комболисте: {{ session.statistic.combolistcount }}</label>
            </div>
          </li>
          <li class="flex-1 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center px-3 py-1">
              <label for="horizontal-list-radio-id" class="w-full text-gray-900 dark:text-gray-300">Количество прокси: {{ session.statistic.proxycount }}</label>
            </div>
          </li>
          <li class="flex-1 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center px-3 py-1">
              <label for="horizontal-list-radio-id" class="w-full text-gray-900 dark:text-gray-300">Пройдено строк: {{ session.statistic.passedcount }}</label>
            </div>
          </li>
          <li class="flex-1 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center px-3 py-1">
              <label for="horizontal-list-radio-military" class="w-full text-gray-900 dark:text-gray-300">Осталось строк: {{session.statistic.lastlines }}</label>
            </div>
          </li>
        </ul>
      </div>

      <!-- Statistic for Protocol -->
      <div v-if="session.module_type == 'MT2'" class="px-5">
        <!-- TODO: Надо изменить этот момент и переделать что бы он отдавал другие данные для модуля-протокола -->
        <ul class="flex w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="flex-1 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center px-3 py-1">
              <label for="horizontal-list-radio-license" class="w-full text-gray-900 dark:text-gray-300">Хостов: {{ session.statistic.H_COUNT }}</label>
            </div>
          </li>
          <li class="flex-1 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center px-3 py-1">
              <label for="horizontal-list-radio-license" class="w-full text-gray-900 dark:text-gray-300">Логинов: {{ session.statistic.U_COUNT }}</label>
            </div>
          </li>
          <li class="flex-1 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center px-3 py-1">
              <label for="horizontal-list-radio-license" class="w-full text-gray-900 dark:text-gray-300">Паролей: {{ session.statistic.P_COUNT }}</label>
            </div>
          </li>
          <li class="flex-1 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center px-3 py-1">
              <label for="horizontal-list-radio-id" class="w-full text-gray-900 dark:text-gray-300">Проксей: {{ session.statistic.proxycount }}</label>
            </div>
          </li>
          <li class="flex-1 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center px-3 py-1">
              <label for="horizontal-list-radio-id" class="w-full text-gray-900 dark:text-gray-300">Всего комбинаций: {{ session.statistic.C_COUNT }}</label>
            </div>
          </li>
          <li class="flex-1 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center px-3 py-1">
              <label for="horizontal-list-radio-id" class="w-full text-gray-900 dark:text-gray-300">Пройдено комбинаций: {{ session.statistic.PD_COUNT }}</label>
            </div>
          </li>
          <li class="flex-1 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center px-3 py-1">
              <label for="horizontal-list-radio-military" class="w-full text-gray-900 dark:text-gray-300">Осталось комбинаций: {{session.statistic.L_COUNT }}</label>
            </div>
          </li>
        </ul>
      </div>

      <!-- Error Message -->
      <div v-if="session.errors" class="px-5">
        <div id="alert-border-2" class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
          <div class="flex p-4 mb-4 text-sm text-reed-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">Произошла ошибка:</span>
                <ul class="mt-1.5 list-disc list-inside">
                  <li v-for="err in session.errors.split(';')" :key="err">{{ err }}</li>
                </ul>
            </div>
          </div> 
        </div>
      </div>
    </div>

    <!-- Main modal -->
    <div v-if="select_item > 0" @click="select_item = 0" class="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40" aria-hidden="true"></div>
    <!-- Модальное окно выбора Комболиста -->
    <div v-if="select_item === 1" id="list-modal" tabindex="-1" aria-hidden="true" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50 w-full max-w-md max-h-full">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Modal content -->
        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Выбор комбо листа</h3>
            <button @click="select_item = 0" type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
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
                <!-- TODO: надо будет проверить как оно работает с модулями-протоколами -->
                <ul>          
                  <ComboItem class="space-y-2 font-medium" :node="node" v-for="node in tree" :key="node" 
                    @call-parent-method="parentMethod" :isShowId="showId" :isSelectId="selectId"/>
                </ul>
              </div>
              <button @click.prevent="SelectAction('database_id')"  type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Выбрать комбо лист</button>
            </form>
          </div>

        </div>
      </div>
    </div>
    <!-- Модальное окно выбора Прокси пресета -->
    <div v-if="select_item === 2" id="proxy-modal" tabindex="-1" aria-hidden="true" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50 w-full max-w-md max-h-full">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Modal content -->
        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Выбор прокси из пресета</h3>
            <button @click="select_item = 0" type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
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
                  <li @click="selectProxyPreset(preset.id)" class="space-y-2 font-medium" v-for="preset in tree" :key="preset" ref="pli" :id="preset.id">
                    <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 8C5.80777 8 5.13108 7.79473 4.55551 7.41015C3.97993 7.02556 3.53133 6.47893 3.26642 5.83939C3.00152 5.19985 2.9322 4.49612 3.06725 3.81719C3.2023 3.13825 3.53564 2.51461 4.02513 2.02513C4.51461 1.53564 5.13825 1.2023 5.81719 1.06725C6.49612 0.932205 7.19985 1.00152 7.83939 1.26642C8.47893 1.53133 9.02556 1.97993 9.41015 2.55551C9.79473 3.13108 10 3.80777 10 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.5 17H1V15C1 13.9391 1.42143 12.9217 2.17157 12.1716C2.92172 11.4214 3.93913 11 5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19.5 11H18.38C18.2672 10.5081 18.0714 10.0391 17.801 9.613L18.601 8.818C18.6947 8.72424 18.7474 8.59708 18.7474 8.4645C18.7474 8.33192 18.6947 8.20476 18.601 8.111L17.894 7.404C17.8002 7.31026 17.6731 7.25761 17.5405 7.25761C17.4079 7.25761 17.2808 7.31026 17.187 7.404L16.392 8.204C15.9647 7.93136 15.4939 7.73384 15 7.62V6.5C15 6.36739 14.9473 6.24021 14.8536 6.14645C14.7598 6.05268 14.6326 6 14.5 6H13.5C13.3674 6 13.2402 6.05268 13.1464 6.14645C13.0527 6.24021 13 6.36739 13 6.5V7.62C12.5081 7.73283 12.0391 7.92863 11.613 8.199L10.818 7.404C10.7242 7.31026 10.5971 7.25761 10.4645 7.25761C10.3319 7.25761 10.2048 7.31026 10.111 7.404L9.404 8.111C9.31026 8.20476 9.25761 8.33192 9.25761 8.4645C9.25761 8.59708 9.31026 8.72424 9.404 8.818L10.204 9.618C9.9324 10.0422 9.73492 10.5096 9.62 11H8.5C8.36739 11 8.24021 11.0527 8.14645 11.1464C8.05268 11.2402 8 11.3674 8 11.5V12.5C8 12.6326 8.05268 12.7598 8.14645 12.8536C8.24021 12.9473 8.36739 13 8.5 13H9.62C9.73283 13.4919 9.92863 13.9609 10.199 14.387L9.404 15.182C9.31026 15.2758 9.25761 15.4029 9.25761 15.5355C9.25761 15.6681 9.31026 15.7952 9.404 15.889L10.111 16.596C10.2048 16.6897 10.3319 16.7424 10.4645 16.7424C10.5971 16.7424 10.7242 16.6897 10.818 16.596L11.618 15.796C12.0422 16.0676 12.5096 16.2651 13 16.38V17.5C13 17.6326 13.0527 17.7598 13.1464 17.8536C13.2402 17.9473 13.3674 18 13.5 18H14.5C14.6326 18 14.7598 17.9473 14.8536 17.8536C14.9473 17.7598 15 17.6326 15 17.5V16.38C15.4919 16.2672 15.9609 16.0714 16.387 15.801L17.182 16.601C17.2758 16.6947 17.4029 16.7474 17.5355 16.7474C17.6681 16.7474 17.7952 16.6947 17.889 16.601L18.596 15.894C18.6897 15.8002 18.7424 15.6731 18.7424 15.5405C18.7424 15.4079 18.6897 15.2808 18.596 15.187L17.796 14.392C18.0686 13.9647 18.2662 13.4939 18.38 13H19.5C19.6326 13 19.7598 12.9473 19.8536 12.8536C19.9473 12.7598 20 12.6326 20 12.5V11.5C20 11.3674 19.9473 11.2402 19.8536 11.1464C19.7598 11.0527 19.6326 11 19.5 11ZM14 14.5C13.5055 14.5 13.0222 14.3534 12.6111 14.0787C12.2 13.804 11.8795 13.4135 11.6903 12.9567C11.5011 12.4999 11.4516 11.9972 11.548 11.5123C11.6445 11.0273 11.8826 10.5819 12.2322 10.2322C12.5819 9.8826 13.0273 9.6445 13.5123 9.54804C13.9972 9.45157 14.4999 9.50108 14.9567 9.6903C15.4135 9.87952 15.804 10.2 16.0787 10.6111C16.3534 11.0222 16.5 11.5055 16.5 12C16.5 12.663 16.2366 13.2989 15.7678 13.7678C15.2989 14.2366 14.663 14.5 14 14.5Z" fill="currentColor"/>
                      </svg>

                      <span class="ms-5">{{ preset.name }}</span>
                      <span class="ml-auto py-1">{{ preset.create_time }}</span>
                    </a>          
                  </li>    
                </ul>
              </div>
              <button @click.prevent="SelectAction('proxy_id')"  type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Выбрать прокси пресет</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Модальное окно выбора комбо листа из файла -->
    <div v-if="select_item === 3" id="proxy-modal" tabindex="-1" aria-hidden="true" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50 w-full max-w-md max-h-full">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Modal content -->
        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Выбор комбо-листа из файла</h3>
            <button @click="select_item = 0" type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-4 md:p-5">
            <form class="space-y-4" action="#">
              <div class="col-span-3 sm:col-span-1">
                <label for="timeout" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Тип данных</label>
                <select v-model="insertItem.data_type" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option :value="'DT1'">EMAIL</option>
                  <option :value="'DT2'">USERNAME</option>
                  <option :value="'DT3'">PASSWORD</option>
                  <option :value="'DT4'">PIN</option>
                  <option :value="'DT5'">USERNAME:PASSWORD</option>
                  <option :value="'DT6'">EMAIL:PASSWORD</option>
                  <option :value="'DT7'">DATA</option>
                  <option :value="'DT8'">HOSTNAME</option>    
                </select>
              </div>
                
              <input @change="insertItem.file = $event.target.files[0]" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">            
              <button @click.prevent="UploadSessionComboList()"  type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Выбрать комбо-лист из файла</button>
              <div v-if="uploading">
                <p>Прогресс: {{ progress }}%</p>
                <progress :value="progress" max="100"></progress>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>    
    <!-- Модальное окно выбора Прокси из файла -->
    <div v-if="select_item === 4" id="proxy-modal" tabindex="-1" aria-hidden="true" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50 w-full max-w-md max-h-full">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Modal content -->
        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Выбор прокси из файла</h3>
            <button @click="select_item = 0" type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-4 md:p-5">
            <form class="space-y-4" action="#">
              <div class="col-span-3 sm:col-span-1">
                <label for="timeout" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Тип прокси</label>
                <select v-model="insertItem.proxy_type" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option :value="'PT1'">HTTP/S</option>
                  <option :value="'PT2'">SOCKS4</option>
                  <option :value="'PT3'">SOCKS5</option>
                </select>
              </div>
                
              <input @change="insertItem.file = $event.target.files[0]" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">            
              <button @click.prevent="UploadSessionProxy()"  type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Выбрать прокси из файла</button>
              <div v-if="uploading">
                <p>Прогресс: {{ progress }}%</p>
                <progress :value="progress" max="100"></progress>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>

    <SessionResult :isShow="ShowResults" :sessionId="session_id" :moduleType="session.module_type" @SetFalseShowResults="ShowResults = false"/>
  </div>

  <!-- AlertForm --> 
  <AlertForm :msg_txt="msg_txt" :msg_id="msg_id" />
</template>


<script>

import axios from 'axios'
import SessionResult from './SessionResultsForm.vue'
import AlertForm from '../Common/AlertForm.vue'
import ComboItem from '../Common/ComboItem.vue'

const selectedClassDay = 'bg-gray-100'
const selectedClassDark = 'dark:bg-gray-700'

export default {
  components: {
    AlertForm,
    ComboItem,
    SessionResult
  },
  props: ['session_id'],
  data() {
    return {
      msg_txt: null,
      msg_id: 0,
      name_value: null,
      worker_count_value: null,
      timeout_value: null,
      select_item: 0,
      tree: null,
      showId: -1,
      selectId: -1,
      ShowResults: false,
      comboSelectionType: 0,
      
      session: {},
      insertItem: {},
      uploading: false,
      progress: 0
    }
  },
  watch: {
    async session_id(newValue) {
      if (newValue != null) {
        await this.mount()
      }
    }
  },
  async mounted() {
    await this.mount()
  },
  methods: {
    async mount() {
      const response = await this.HTTP('GET', '/api/sess/GetInfoSession/?id='+this.session_id, null)
      if (response.success) {
        this.session = response.session
        this.name_value = this.session.name
        this.worker_count_value = this.session.worker_count
        this.timeout_value = this.session.timeout
        if (this.session.inputs !== null) {
          this.session.inputs.forEach(input => {
            if (input.type === 'IT4') {
              input.value = (input.value === '1')
            }
          })
        }
        await this.RefreshStatistic()
      } else {
        this.msg_txt = response.msg_txt 
        this.msg_id = 0
      }
    },
    async AlterField(Field, Value) {
      const response = await this.HTTP('POST', '/api/sess/AlterSession', {
        id: this.session.id,
        field: Field,
        new_value: Value
      })

      if (response.success) {
        this.msg_txt = response.msg_txt 
        this.msg_id = 1
        this.session.name = this.name_value
      } else {
        this.msg_txt = response.msg_txt 
        this.msg_id = 0
      }
      if (Field === 'status') {
        await this.mount()
      }  
    },
    selectProxyPreset(id) {
      this.selectId = id
      this.$refs.pli.forEach(async (element) => {
        if (id == element.id) {
          element.classList.add(selectedClassDay)
          element.classList.add(selectedClassDark)
        } else {
          element.classList.remove(selectedClassDay)
          element.classList.remove(selectedClassDark)
        }
      })
    },
    async ItemSelect(i, b) {
      this.comboSelectionType = b
      this.select_item = i
      if (i === 4) {
        this.insertItem = {}
        this.insertItem.proxy_type = 'PT1'
        return
      }

      if (i === 3) {
        this.insertItem = {}
        this.insertItem.data_type = 'DT1'
        return
      }
      
      let url
      switch (i) {
        case 1: url = '/api/list/GetComboLists';   break;
        case 2: url = '/api/prox/GetProxyPresets'; break;
      }
      const response = await this.HTTP('GET', url, null)
      if (response.success) {
        switch (i) {
          case 1: this.tree = response.tree;    break;
          case 2: this.tree = response.presets; break;
        }  
      } else {
        this.msg_txt = response.msg_txt
        this.msg_id = 0
      }
    },
    async SelectAction(a) {
      this.msg_txt = ''
      this.msg_id = -1 
      if (this.selectId === -1) {
        this.msg_txt = 'Выберите элемент'
        this.msg_id = 0
        return
      }

      if (a === 'database_id') {
        switch(this.comboSelectionType) {
          case 0: a = 'database_id'; break;
          case 1: a = 'username_id'; break;
          case 2: a = 'password_id'; break;  
        }
      }

      await this.AlterField(a, this.selectId)
      await this.mount()
      this.select_item = 0
      this.selectId = -1
    },
    async PullAction(a) {
      const response = await this.HTTP('POST', '/api/sess/ActionSession', {
        id: this.session_id,
        action: a
      })
      if (response.success) {
        this.msg_txt = response.msg_txt
        this.msg_id = 1
      } else {
        this.msg_txt = response.msg_txt
        this.msg_id = 0
      }
    },
    async RefreshStatistic() {
      const response = await this.HTTP('GET', '/api/sess/GetStatistic/?id='+this.session_id, null)
      if (response.success) {
        this.session.finish_time = response.finish_time
        this.session.status = response.status
        this.session.result = response.result
        this.session.statistic = response.statistic
      } else {
        this.msg_txt = response.msg_txt 
        this.msg_id = 0
      } 
    },
    async UploadSessionProxy() {
      this.msg_txt = null 
      this.msg_id = -1
      if (this.insertItem.file == null) {
        this.msg_txt = 'Укадите файл с прокси'
      }
      if (this.insertItem.file.name.slice(-4).toUpperCase() !== '.TXT') {
        this.msg_txt = 'Формат файла не соответствует'
      }
      if (this.msg_txt != null) {
        this.msg_id = 0
        return
      }
      
      this.uploading = true
      const formData = new FormData()
      formData.append("proxy_type", this.insertItem.proxy_type)
      formData.append("session_id", this.session_id)
      formData.append("file", this.insertItem.file)
      
      axios.post(this.server_addr+'/api/sess/UploadProxy', formData, {
        headers:{
          'Authorization': localStorage.accessToken,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          this.progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
        }
      })
      .then(async (response) => {
        if (response.data.success) {
          this.msg_txt = 'Прокси были загружены'
          this.msg_id = 1
          await this.mount()
        } else {
          this.msg_txt = response.data.msg_txt
          this.msg_id = 0
        }
      })
      .catch((error) => {
        this.msg_txt = error.response.data.msg_txt
        this.msg_id = 0
      })
      .finally(() => {
        this.select_item = 0
        this.insertItem = {}
        this.uploading = false
        this.progress = 0
      })
    },
    async UploadSessionComboList() {
      this.msg_txt = null 
      this.msg_id = -1
      if (this.insertItem.file == null) {
        this.msg_txt = 'Укадите файл с комбо-листом'
      }
      if (this.insertItem.file.name.slice(-4).toUpperCase() !== '.TXT') {
        this.msg_txt = 'Формат файла не соответствует'
      }
      if (this.msg_txt != null) {
        this.msg_id = 0
        return
      }

      this.uploading = true
      const formData = new FormData()
      formData.append("session_id", this.session_id)
      formData.append("combo_type", this.comboSelectionType)
      formData.append("data_type", this.insertItem.data_type)
      formData.append("file", this.insertItem.file)
      
      axios.post(this.server_addr+'/api/sess/UploadComboList', formData, {
        headers:{
          'Authorization': localStorage.accessToken,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          this.progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
        }
      })
      .then(async (response) => {
        if (response.data.success) {
          this.msg_txt = 'Комбо-лист успешно загружен'
          this.msg_id = 1
          await this.mount()
        } else {
          this.msg_txt = response.data.msg_txt
          this.msg_id = 0
        }
      })
      .catch((error) => {
        this.msg_txt = error.response.data.msg_txt
        this.msg_id = 0
      })
      .finally(() => {
        this.select_item = 0
        this.insertItem = {}
        this.uploading = false
        this.progress = 0
      })
    },
    parentMethod(action, id) {
      if (action === "select") {
        this.selectId = id
      }
      this.showId = -2
    },
    async ApplyInputFields() {
      this.msg_txt = null 
      this.msg_id = -1
      const response = await this.HTTP('POST', '/api/sess/ApplyInputFields/?id='+this.session_id, {inputs: this.session.inputs})
      if (response.success) {
        this.msg_txt = 'Поля ввода были успешно применены'
        this.msg_id = 1
      } else {
        this.msg_txt = response.msg_txt
        this.msg_id = 0
      }
    }
  }
}

</script>
