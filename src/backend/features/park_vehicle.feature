Feature: Register a vehicle
  In order to follow many vehicles with my application
  As an application user
  I should be able to register my vehicle

  @critical
  Scenario: I can register a vehicle
    Given my fleet
    And a vehicle
    When I register this vehicle into my fleet
    Then this vehicle should be part of my fleet

  Scenario: I can't register same vehicle twice
    Given my fleet
    And a vehicle
    And I have registered this vehicle into my fleet
    When I try to register this vehicle into my fleet
    Then I should be informed that this vehicle is already registered in my fleet

  Scenario: Same vehicle can belong to more than one fleet
    Given my fleet
    And another user's fleet
    And a vehicle
    And this vehicle has been registered in the other user's fleet
    When I register this vehicle into my fleet
    Then this vehicle should be part of my fleet
