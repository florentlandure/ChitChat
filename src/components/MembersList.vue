<template>
  <div class="members-list">
    <h4>Members</h4>
    <ul class="list">
      <li v-for="member in getMembers" class="member-item">
        <!-- <img :src="member.img" :title="member.name" class="member-image"> -->
        <p class="member-name">{{ member }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'membersList',
  computed: {
    ...mapGetters([
      'getMembers',
      'getCurrentChat',
      'getCurrentUser'
    ])
  },
  methods: {
    chooseChat (name) {
      this.$store.commit('switchChat', name)
    }
  }
}
</script>

<style scoped lang="scss">
$primaryColor: #37474f;
$primaryColorDark: #263238;
$colorAccent: #ff5252;
$colorAccentDark: #d50000;
$fontColor: #fafafa;

.members-list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 250px;
  overflow-y: auto;

  & > .list {
    border-left: 2px solid $primaryColorDark;
    flex: 1;
    margin: 0;
    padding: 0;
  }

  & > h4 {
    border-left: 2px solid $primaryColor;
  }

  & .member-item {
    padding: 10px;
    display: flex;
    cursor: pointer;
    align-items: center;

    &:hover {
      background: $primaryColorDark;
    }

    & > .member-image {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      background: $primaryColorDark;
    }

    & > .member-name {
      flex: 1;
      margin: 0;
      margin-left: 15px;
    }
  }
}
</style>
