"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"

import { AuthContext } from '@/contexts/AuthContext';
import { useContext, useState,useEffect } from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/innerDashComponents/avatar"
import { Button } from "@/components/innerDashComponents/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/innerDashComponents/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/innerDashComponents/dialog"
import { Input } from "@/components/innerDashComponents/input"
import { Label } from "@/components/innerDashComponents/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/innerDashComponents/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/innerDashComponents/select"


type Portfolio = {
  label: string;
  value: string;
};

type Group = {
  label: string;
  portfolios: Portfolio[];
};



type Team = Portfolio;

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const { auth } = useContext(AuthContext);

  const [groups, setGroups] = useState<Group[]>([]);



  const [open, setOpen] = React.useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
  const [selectedTeam, setSelectedTeam] = React.useState<Portfolio | null>(null);


  const [name, setName] = useState('');
  const [description, setDescription] = useState('');



  const createNewPortfolio = async (name: string, description: string) => {  
    const apiUrl_deployed = `https://neuralfin-backend-production.up.railway.app/api/portfolio/portfolios/`;

    await fetch(apiUrl_deployed, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name,
        description,
      })
    });
  }

  useEffect(() => {
    const abortController = new AbortController();

    if (auth.user) {
      getUserPortfolios(abortController);
    }

    return () => {
      abortController.abort();
    };
  }, [auth.user]);



  async function getUserPortfolios(abortController: AbortController) {

    const apiUrl_deployed = `https://neuralfin-backend-production.up.railway.app/api/portfolio/portfolios/${auth.user?.id}/`;

    console.log(auth.user?.id)
    console.log('lol')

    const res = await fetch(apiUrl_deployed, {
      credentials: 'include',
      signal: abortController.signal,

    })

    const data = await res.json();

    console.log(data)

    if (Array.isArray(data) && data.length > 0) {
      console.log('Portfolios found');

      const personalPortfolios = data.filter(
        (portfolio: any) => portfolio.description.includes("personal")
      );
      const mockPortfolios = data.filter(
        (portfolio: any) => portfolio.description.includes("mock")
      );

      const personalPortfolioData = personalPortfolios.map((portfolio: any) => ({
        label: portfolio.name,
        value: portfolio.id,
      }));

      const mockPortfolioData = mockPortfolios.map((portfolio: any) => ({
        label: portfolio.name,
        value: portfolio.id,
      }));

      setGroups([
        {
          label: "Personal Account",
          portfolios: personalPortfolioData,
        },
        {
          label: "Mock Portfolios",
          portfolios: mockPortfolioData,
        },
      ]);

      if (personalPortfolioData.length > 0) {
        setSelectedTeam(personalPortfolioData[0]);
      } else if (mockPortfolioData.length > 0) {
        setSelectedTeam(mockPortfolioData[0]);
      } else {
        setSelectedTeam(null);
      }
    } else {
      console.log('No portfolios found');
      return;
    }
  }




  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a Portfolio"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedTeam?.value}.png`}
                alt={selectedTeam?.label}
              />
                
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedTeam? selectedTeam.label : "Select a Portfolio"}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 bg-white bg-opacity-30 backdrop-filter backdrop-blur-md">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search portfolio..." />
              <CommandEmpty>No portfolio found</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.portfolios.map((team: Portfolio) => (
                    <CommandItem
                      key={team.value}
                      onSelect={() => {
                        setSelectedTeam(team)
                        setOpen(false)
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${team.value}.png`}
                          alt={team.label}
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedTeam?.value === team.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewTeamDialog(true)
                    }}
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Portfolio
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Portfolio</DialogTitle>
          <DialogDescription>
            Add a new portfolio to track and analyze your investments.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Portfolio Name</Label>
              <Input 
                id="name"
                placeholder="Main Portfolio"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Portfolio Description</Label>
              <Select
                onValueChange={(value) => setDescription(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select what applies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">
                    <span className="font-medium">Personal</span> -{" "}
                    <span className="text-muted-foreground">
                      This portfolio tracks my personal investments
                    </span>
                  </SelectItem>
                  <SelectItem value="mock">
                    <span className="font-medium">Mock</span> -{" "}
                    <span className="text-muted-foreground">
                      This portfolio tracks test investments
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button 
            type="submit"
            onClick={() => {
              createNewPortfolio(name, description);
              setShowNewTeamDialog(false);
            }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}