<template>
  

  <div class="mt-2 relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <tbody>
        <tr v-for="item in info " :key="item" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ item.key }}</th>
          <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ item.val }}</th>          
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">Github</th>
          <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">https://github.com/t0xUser/BruteCore_frontend<br>https://github.com/t0xUser/BruteCore_backend</th>          
        </tr>
      </tbody>
    </table>

    <div class="mt-2 mx-3 flex justify-between items-center">
      <h1 class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Справочник значений</h1>        
    </div>
    <hr class="border mx-3 border-gray-500 mt-1 mb-1">
    <div class="mx-3 relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Код</th>
            <th scope="col" class="px-6 py-3">Группа</th>
            <th scope="col" class="px-6 py-3">Наименование</th>
          </tr>
        </thead>
          <tbody>
            <tr v-for="re in references" :key="re" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{re.id}}</th>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{re.group}}</th>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{re.name}}</th>                    
            </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      msg_txt: null,
      msg_id: 0,
      references: [],
      info: []
    };
  },
  async mounted() {
    this.msg_txt = null
    this.msg_id = -1
    let response
    
    response = await this.HTTP('GET', '/Info', null)
    if (response.success) {
      this.info = response.info
    } else {
      this.msg_txt = 'Попробуйте позже!'
      this.msg_id = 0
    }

    response = await this.HTTP('GET', '/Reference', null)
    if (response.success) {
      this.references = response.refs
    } else {
      this.msg_txt = 'Попробуйте позже!'
      this.msg_id = 0
    }
  }
};
</script>