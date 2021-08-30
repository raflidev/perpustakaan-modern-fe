<template>
  <div class="flex">
      <Sidebar/>
      <div class="w-5/6 min-h-screen">
         <div class="p-10">
            <div class="space-y-2 mb-6">
            <h1 class="font-bold text-2xl">
              User
            </h1>
            <p>Halaman management user</p>
            <div>
            <div class="my-7">
              <router-link to="/admin/user/add" class="bg-green-500 px-4 py-2 rounded text-white">Tambah User</router-link>   
            </div>
              <table class=" w-5/6 bg-gray-200 text-gray-800">
                <tr class="text-left border-b-2 border-gray-300">
                    <th class="px-4 py-3">Username</th>
                    <th class="px-4 py-3">Fullname</th>
                    <th class="px-4 py-3">Email</th>
                    <th class="px-4 py-3">Admin</th>
                    <th class="px-4 py-3">Valid</th>
                    <th class="px-4 py-3">Action</th>
                </tr>
                
                <tr class="bg-gray-100 border-b border-gray-200" v-for='user in users' :key='user.index'>
                    <td class="px-4 py-3">{{user.username}}</td>
                    <td class="px-4 py-3">{{user.full_name}}</td>
                    <td class="px-4 py-3">{{user.email}}</td>
                    <td class="px-4 py-3">{{user.role}}</td>
                    <td class="px-4 py-3">{{user.valid}}</td>
                    <td class="px-4 py-3">
                        <router-link :to="'/admin/user/'+user._id+'/edit'" class="px-4 py-2 bg-yellow-300 text-black rounded text-xs">Edit</router-link>
                        <button @click="userDelete(user._id)" class="px-4 py-2 bg-red-600 text-white rounded text-xs">Delete</button>
                        <button v-if="!user.valid" @click="userValid(user._id)" class="px-4 py-2 bg-green-600 text-white rounded text-xs">Validasi</button>
                    </td>
                </tr> 
                </table>
            </div>
          </div>
         </div>
      </div>
  </div>
</template>

<script>
export default {
name:"buku",
data(){
    return{
        user:[],
        users: []
    }
},
methods:{
    userDelete(id){
    this.$swal.fire({
      icon: 'question',
      title: 'Ingin Menghapus User?',
      showCancelButton: true,
      confirmButtonText: `Ya`
    }).then((result) => {
      if (result.isConfirmed) {
        this.$axios.delete(`http://localhost:4000/api/user/${id}`).then(data => {
            if(data.status == 200) {
                this.$swal.fire('User berhasil dihapus', '' , 'success')
                this.$router.go(0)
            }
        })
      }
    })
    },
    userValid(id){
      this.$swal.fire({
      icon: 'question',
      title: 'Validasi User?',
      showCancelButton: true,
      confirmButtonText: `Ya`
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.$get(`http://localhost:4000/api/user/${id}`).then(user => {
            console.log(user);
            this.$axios.put(`http://localhost:4000/api/user/${id}`, {
              full_name: user.fullname,
              username: user.username,
              email: user.email,
              password: user.password,
              role: user.role,
              valid: true
            }).then((data) => {
              const local = JSON.parse(localStorage.getItem('user_perpus'))
              if (local[0]._id === data['data']._id) {
                localStorage.removeItem('user_perpus')
                localStorage.setItem('user_perpus', JSON.stringify([data['data']]))
              }
              this.$swal.fire({
              icon: 'success',
              title: 'User berhasil divalidasi',
              text: 'silakan suruh user login ulang, agar bisa akses page qr code',
              showCancelButton: false,
              confirmButtonText: `Ya`
              }).then(result => {
                if (result.isConfirmed){
                  this.$router.go(0)
                }else{
                  this.$router.go(0)
                }
              })
            })
          })
        }
      })
    }
},
mounted(){
   this.$axios.$get(`${process.env.apiUri}/api/user`).then(users => {
        this.users = users
      })
      const local = JSON.parse(localStorage.getItem('user_perpus'))
      this.$axios.post(`${process.env.apiUri}/api/veriftoken`, {
        token: local
      }).then(dataToken => {
          this.user = dataToken.data.user
          if (!this.user.role) {
            this.$swal.fire('Tidak punya hak', 'anda bukan admin', 'error');
            this.$router.push('/admin')
          }
      }).catch(() => {
          localStorage.removeItem('user_perpus')
          this.$router.push('/auth/login')
        })
},
}
</script>

<style>

</style>