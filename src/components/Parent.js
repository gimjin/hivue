import { mapActions, mapGetters } from 'vuex'

export default {
  mounted () {
    this.syncName().then(message => {
      console.info(message)
    })
  },
  computed: {
    ...mapGetters([
      'getCatDetail'
    ])
  },
  methods: {
    ...mapActions([
      'syncName'
    ])
  }
}
