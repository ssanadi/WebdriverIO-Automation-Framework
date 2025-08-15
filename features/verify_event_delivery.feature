Feature: Event Delivery to Destination

  Scenario: Verify event delivered to destination
    Given I am logged into RudderStack
    And I skip MFA setup
    When I navigate to the connections page
    And I extract the data plane URL 
    And I extract the write key for "http-dev"
    And I navigate to the "http-hook" destination
    And I go to the Events tab
    And I get the initial event counts
    And I send a track event via API
    Then the delivered event count should increase
    And there should be no failed events