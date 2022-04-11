import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async welcome({ view }: HttpContextContract) {
    return view.render('welcome')
  }

  public async forgetPass({ view }: HttpContextContract) {
    return view.render('layouts/recuperarSenha/forgetPass')
  }

  public async recover({ view }: HttpContextContract) {
    return view.render('layouts/recuperarSenha/telaResposta')
  }

  public async login({}: HttpContextContract) {}

  public async index({ view, auth }: HttpContextContract) {
    const user = auth.user
    if (user?.tipo === 'estudante') {
      return view.render('grupo-1/tela1', { user })
    } else {
      return view.render('grupo-1/tela1', { user })
    }
  }

  public async create({ view }: HttpContextContract) {
    return view.render('login')
  }

  public async store({ request, response, auth, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      await auth.use('web').attempt(email, password)
      console.log('teste')
      return response.redirect().toRoute('sessions.index', { tipo: auth.user?.tipo })
    } catch (error) {
      console.log('deu merda')
      console.log(error)
      session.flashExcept(['login'])
      session.flash({ errors: { login: 'Credenciais não encontradas ou inexistentes' } })
      return response.redirect().toRoute('sessions.login')
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ response, auth }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect().toRoute('sessions.login')
  }
}
