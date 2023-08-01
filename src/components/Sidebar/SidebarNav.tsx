import { Stack } from '@chakra-ui/react'
import {
  RiDashboardLine as IconDashboard,
  RiInputMethodLine as IconInput,
  RiContactsLine as IconContact,
  RiGitMergeLine as IconGitMerge,
} from 'react-icons/ri'
import { NavSection } from './NavSection'
import { NavLinks } from './NavLinks'

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="ALL">
        <NavLinks icon={IconDashboard} href="/dashboard">
          Dashboard
        </NavLinks>
        <NavLinks icon={IconContact} href="/users">
          Users
        </NavLinks>
      </NavSection>
      <NavSection title="AUTOMATION">
        <NavLinks icon={IconInput} href="/forms">
          Forms
        </NavLinks>
        <NavLinks icon={IconGitMerge} href="/automation">
          Automation
        </NavLinks>
      </NavSection>
    </Stack>
  )
}
