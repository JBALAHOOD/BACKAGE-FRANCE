import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { 
  Search, 
  CheckCircle, 
  Plane, 
  Shield, 
  Clock, 
  Users,
  ArrowRight,
  Luggage,
  AlertTriangle,
  Star
} from 'lucide-react'
import { mockAirlines } from '../lib/utils'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredAirlines, setFilteredAirlines] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredAirlines([])
      return
    }
    
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      const filtered = mockAirlines.filter(airline => 
        airline.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airline.code_iata.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredAirlines(filtered)
      setIsSearching(false)
    }, 500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const features = [
    {
      icon: CheckCircle,
      title: 'Vérification instantanée',
      description: 'Obtenez des résultats immédiats pour vos dimensions de bagages'
    },
    {
      icon: Shield,
      title: 'Données fiables',
      description: 'Informations officielles des compagnies aériennes mises à jour'
    },
    {
      icon: Clock,
      title: 'Gain de temps',
      description: 'Évitez les files d\'attente et les surprises à l\'aéroport'
    },
    {
      icon: Users,
      title: 'Pour tous',
      description: 'Interface simple et intuitive pour tous les voyageurs'
    }
  ]

  const stats = [
    { number: '100+', label: 'Compagnies aériennes' },
    { number: '50k+', label: 'Vérifications effectuées' },
    { number: '99%', label: 'Précision des données' },
    { number: '24/7', label: 'Disponibilité' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-amber-50"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-l from-blue-100 to-transparent opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-gradient-to-r from-amber-100 to-transparent opacity-40 rounded-full blur-2xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Main Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>Vérification instantanée et fiable</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                Vérifiez vos
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                  {" "}bagages
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl">
                Évitez les mauvaises surprises à l'aéroport. Vérifiez instantanément si vos valises respectent 
                les dimensions autorisées par votre compagnie aérienne.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/verification">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                             text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl 
                             transition-all duration-300 group w-full sm:w-auto h-14"
                  >
                    Vérifier maintenant
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                  className="font-semibold px-8 py-4 text-lg border-2 hover:bg-slate-50 w-full sm:w-auto h-14"
                >
                  En savoir plus
                </Button>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Luggage className="w-8 h-8 text-blue-600" />
                    <span className="text-lg font-semibold">Bagage cabine</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-green-700 font-medium">Dimensions</div>
                      <div className="text-green-600">55 x 35 x 25 cm</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-green-700 font-medium">Poids</div>
                      <div className="text-green-600">12 kg max</div>
                    </div>
                  </div>
                  <Badge variant="success" className="w-full justify-center py-2">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Conforme aux règles
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Trouvez votre compagnie aérienne
            </h2>
            <p className="text-xl text-slate-600">
              Recherchez parmi plus de 100 compagnies aériennes pour connaître leurs politiques de bagages
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Ex: Air France, Lufthansa, AF, LH..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full h-16 pl-12 pr-32 text-lg border-2 border-slate-200 
                         focus:border-blue-500 focus:ring-0 rounded-2xl
                         shadow-lg hover:shadow-xl transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400" />
              <Button 
                onClick={handleSearch}
                disabled={isSearching}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 
                         bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                         h-12 px-6 rounded-xl font-semibold"
              >
                {isSearching ? 'Recherche...' : 'Rechercher'}
              </Button>
            </div>
          </div>

          {/* Search Results */}
          {filteredAirlines.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAirlines.map((airline) => (
                <Link key={airline.id} to={`/verification?airline=${airline.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <Plane className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{airline.nom}</h3>
                            <Badge variant="outline" className="text-xs">{airline.code_iata}</Badge>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Pourquoi choisir Contrôle des bagages ?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Notre plateforme vous offre tous les outils nécessaires pour voyager en toute sérénité
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Des chiffres qui parlent
            </h2>
            <p className="text-xl text-blue-100">
              Rejoignez des milliers de voyageurs qui nous font confiance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home