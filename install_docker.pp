# install_docker.pp

# Define a class to encapsulate the Docker setup
class docker_setup {

  # Ensure the Docker package is installed
  package { 'docker.io':
    ensure => installed,
  }

  # Ensure the Docker service is running and enabled on boot
  service { 'docker':
    ensure  => running,
    enable  => true,
    require => Package['docker.io'], # Don't start the service until the package is installed
  }
}

# Execute the class
include docker_setup