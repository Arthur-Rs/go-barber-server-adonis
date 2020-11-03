'use strict'

const Helpers = use('Helpers')
const uuid = require('uuid')


class AvatarController {
  async update({request, auth}){
    const avatar = request.file('avatar', {
      types: ['image'],
      size: '2mb'
    })

    await avatar.move(Helpers.tmpPath('uploads'), {
      name: `${uuid.v4()}.${avatar.extname}`,
      overwrite: true
    })

    if (!avatar.moved()) {
      return avatar.error()
    }

    auth.user.avatar = avatar.fileName

    await auth.user.save()

    return auth.user
  }
}

module.exports = AvatarController
