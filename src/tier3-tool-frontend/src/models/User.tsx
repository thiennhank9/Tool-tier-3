import { observable, action, computed } from 'mobx'

export default class User {
    @observable type = 0 // 0: Admin, others are Normals
    @observable canAccessWarehouse  = false
    @observable canAccessHHAX = false
    @observable username = ''
    @observable password = ''

    @action
    setType(type: number = 0) {
        this.type = type
    }

    @action
    setUsername(username: string = '') {
        this.username = username
    }

    @action
    setPassword(password: string = '') {
        this.password = password
    }

    @action
    setCanAccessWarehouse(canAccessWarehouse: boolean = false){
        this.canAccessWarehouse = canAccessWarehouse
    }

    @action
    setCanAccessHHAX(canAccessHHAX: boolean = false) {
        this.canAccessHHAX = canAccessHHAX
    }
}