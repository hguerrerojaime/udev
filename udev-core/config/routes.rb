Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/', to: 'index#about'

  get '/d', to: 'domain#index'
  post '/d', to: 'domain#register'
  get '/d/:id', to: 'domain#view'

  get '/d/:id/r', to: 'region#index'
  post '/d/:id/r', to: 'region#create'
  get '/r/:id', to: 'region#view'
  put '/r/:id', to: 'region#update'

  get '/r/:id/o', to: 'domain_object#index'
  post '/r/:id/o', to: 'domain_object#create'
  get '/o/:id', to: 'domain_object#view'
  put '/o/:id', to: 'domain_object#update'

  get '/o/:id/f', to: 'do_field#index'
  post '/o/:id/f', to: 'do_field#create'
  get '/f/:id', to: 'do_field#view'
  put '/f/:id', to: 'do_field#update'

  get '/o/:id/l', to: 'layout#index'
  post '/o/:id/l', to: 'layout#create'
  get '/l/:id', to: 'layout#view'
  put '/l/:id', to: 'layout#update'

  get '/o/:id/rec', to: 'record#list'
  get '/o/:id/rec/l', to: 'record#lookup'
  post '/o/:id/rec', to: 'record#create'
  get '/rec/:id', to: 'record#view'
  put '/rec/:id', to: 'record#update'


  get '/ui/:id/lc', to: 'react#list_component'
  get '/ui/l/:id/:a', to: 'react#layout'

end
